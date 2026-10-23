import { LockMode } from "@mikro-orm/core";
import { Manager } from "../manager/manager.entity.js";
import { IRepository } from "../shared/base.repository.js";
import { Product } from "../product/product.entity.js";
import { SaleItem } from "../saleItem/saleItem.entity.js";
import { orm } from "../shared/db/orm.js";
import { Sale, typesStatus } from "./sale.entity.js";
import { ISaleRepository } from "./sale.interface.js";

export class SaleRepository implements ISaleRepository {
    public async findAll(): Promise<Sale[] | undefined> {
        return await orm.em.find(Sale, {}, {
            populate: ["customer", "saleItems", "saleItems.product"]
        });
    }
    public async findOne(item: { id: number }): Promise<Sale | undefined> {
        const found = await orm.em.findOne(Sale, { id: item.id }, {
            populate: ["customer", "saleItems", "saleItems.product"]
        });

        return found ?? undefined;
    }
    public async add(item: Sale): Promise<Sale | undefined> {
        try {
            const created = orm.em.create(Sale, item);
            await orm.em.persistAndFlush(created);
            return created;
        } catch (error: any) {
            if (error.code === "ER_NO_REFERENCED_ROW_2") {
                throw new Error("The customer ID entered is invalid");
            }
            throw error;
        }
    }
    public async update(id: number, input: Sale): Promise<Sale | undefined> {
        const found = await orm.em.findOne(Sale, { id });
        if (!found) {
            return undefined;
        }
        if (input.date !== undefined) {
            found.date = input.date;
        }
        if (input.paymentMethod !== undefined) {
            found.paymentMethod = input.paymentMethod;
        }
        if (input.status !== undefined) {
            found.status = input.status;
        }
        if (input.customer !== undefined) {
            found.customer = input.customer;
        }
        if (input.totalAmount !== undefined) {
            found.totalAmount = input.totalAmount;
        }
        if (input.deliveryMethod !== undefined) {
            found.deliveryMethod = input.deliveryMethod;
        }
        if (input.paidDate !== undefined) {
            found.paidDate = input.paidDate;
        }
        await orm.em.flush();

        return found;
    }

    public async delete(item: { id: number }): Promise<Sale | undefined> {
        const found = await this.findOne({ id: item.id });
        if (!found) {
            return undefined
        }
        await orm.em.removeAndFlush(found)
        return found;
    }

    public async findByCustomer(customerId: number): Promise<Sale[] | undefined> {
        const found = await orm.em.find(Sale, { customer: customerId });
        return found ?? undefined;
    }

    // Confirma la venta y descuenta el stock de los productos

    public async confirm(id: number): Promise<Sale | undefined> {
        //em: EntityManager => es el objeto que permite ejecutar operaciones sobre la DB.
        //.transactional => ejecuta las operaciones dentro de uhna transaccion de base de datos.
        // Una transacción permite agrupar varias operaciones como si fueran una sola unidad de trabajo.
        // Si todo sale bien, se confirma la venta y se descuenta el stock.
        // Si algo falla, se revierte todo.
        // En resumen, mantiene unidos los cambios. 
        return await orm.em.transactional(async (em) => {
            // ESta es la funcion que contiene todas las opearcioes de esa transaccion.
            // MikroORM le da el EM que corresponde a esa transaccion.
            const sale = await em.findOne(
                Sale,
                { id },
                { lockMode: LockMode.PESSIMISTIC_WRITE }
                // en el findOne, el 3er arg le indica a MikroORM que solicite
                // un bloqueo de escritura sobre la venta que sta buscanado.
                // Esto evita que otro proceso pueda modificar la venta mientras
                // esta transaccion se esta ejecutando.
            );

            if (!sale) {
                return undefined;
            }

            if (sale.status !== typesStatus.PENDING) {
                throw new Error("Only pending sales can be confirmed");
            }

            if (sale.totalAmount === 0) {
                throw new Error("Cannot confirm a sale with no items");
            }

            const items = await em.find(SaleItem, { sale: id });

            if (items.length === 0) {
                throw new Error("Cannot confirm a sale with no items");
            }

            for (const item of items) {
                if (item.quantity <= 0) {
                    throw new Error(
                        "Sale item quantity must be greater than zero"
                    );
                }

                const product = await em.findOne(
                    Product,
                    { id: item.product },
                    { lockMode: LockMode.PESSIMISTIC_WRITE }
                );

                if (!product) {
                    throw new Error(`Product ${item.product} not found`);
                }

                if (product.stock < item.quantity) {
                    throw new Error(
                        `Insufficient stock for product ${product.name}`
                    );
                }

                product.stock -= item.quantity;
            }

            sale.status = typesStatus.CONFIRMED;
            sale.paidDate = new Date();

            await em.flush();

            return sale;
        });
    }
}

