import { LockMode } from "@mikro-orm/core";
import { orm } from "../shared/db/orm.js";
import { PurchaseOrder } from "./purchaseOrder.entity.js";
import { CreatePurchaseOrdersInput, IPurchaseOrderRepository } from "./purchaseOrder.interface.js";
import { PurchaseOrderStatus } from "./purchaseOrder.entity.js";
import { PurchaseOrderItem } from "../purchaseOrderItem/purchaseOrderItem.entity.js";
import { Product } from "../product/product.entity.js";
import { SupplierProduct } from "../supplierProduct/supplierProduct.entity.js";
import { Manager } from "../manager/manager.entity.js";

export class PurchaseOrderRepository implements IPurchaseOrderRepository {
    public async findAll(): Promise<PurchaseOrder[] | undefined> {
        return await orm.em.find(PurchaseOrder, {}, { populate: ["manager", "supplier"] });
    }

    public async findOne(item: { id: number }): Promise<PurchaseOrder | undefined> {
        const found = await orm.em.findOne(PurchaseOrder, { id: item.id }, { populate: ["manager", "supplier"] });
        return found ?? undefined;
    }

    public async add(item: PurchaseOrder): Promise<PurchaseOrder | undefined> {
        const created = orm.em.create(PurchaseOrder, item);
        await orm.em.persistAndFlush(created);
        return created;
    }

    public async update(id: number, input: Partial<PurchaseOrder>): Promise<PurchaseOrder | undefined> {
        const found = await orm.em.findOne(PurchaseOrder, { id });
        if (!found) {
            return undefined;
        }
        if (input.date !== undefined) {
            found.date = input.date;
        }
        if (input.status !== undefined) {
            found.status = input.status;
        }
        if (input.totalAmount !== undefined) {
            found.totalAmount = input.totalAmount;
        }
        if (input.manager !== undefined) {
            found.manager = input.manager;
        }
        await orm.em.flush();
        return found;
    }

    public async delete(item: { id: number }): Promise<PurchaseOrder | undefined> {
        const found = await orm.em.findOne(
            PurchaseOrder,
            { id: item.id },
            { populate: ["purchaseOrderItems"] } // populate determina qué relaciones querés cargar en una consulta concreta.
        );

        if (!found) {
            return undefined;
        }

        await orm.em.removeAndFlush(found);

        return found;
    }
    public async receive(id: number): Promise<PurchaseOrder | undefined> {
        return await orm.em.transactional(async (em) => {
            const purchaseOrder = await em.findOne(PurchaseOrder, { id }, { lockMode: LockMode.PESSIMISTIC_WRITE });
            if (!purchaseOrder) return undefined;
            if (purchaseOrder.status !== PurchaseOrderStatus.Pending)
                throw new Error("Only pending purchase orders can be received");
            const items = await em.find(PurchaseOrderItem, { purchaseOrder: id });
            for (const item of items) {
                const supplierProduct = await em.findOne(SupplierProduct, { id: item.supplierProduct });
                if (!supplierProduct) throw new Error("SupplierProduct not found");
                const product = await em.findOne(Product, { id: supplierProduct.product }, { lockMode: LockMode.PESSIMISTIC_WRITE });
                if (!product) throw new Error("Product not found");
                product.stock += item.quantity;
            }
            purchaseOrder.status = PurchaseOrderStatus.Received;
            await em.flush();
            return purchaseOrder;
        })
    }
    public async cancel(id: number): Promise<PurchaseOrder | undefined> {
        const found = await orm.em.findOne(PurchaseOrder, { id });
        if (!found || found.status !== PurchaseOrderStatus.Pending) return undefined;
        found.status = PurchaseOrderStatus.Cancelled;
        await orm.em.flush();
        return found;
    }
    public async createMultiple(input: CreatePurchaseOrdersInput): Promise<PurchaseOrder[]> {
        return await orm.em.transactional(async (em) => {

            // Validar que exista el administrador
            const manager = await em.findOne(Manager, {
                id: input.manager
            });

            if (!manager) {
                throw new Error("Manager not found");
            }

            // Agrupar los productos por proveedor
            const groupedItems = new Map<number, typeof input.items>();

            for (const item of input.items) {
                const supplierProduct = await em.findOne(
                    SupplierProduct,
                    { id: item.supplierProduct }
                );

                if (!supplierProduct) {
                    throw new Error("SupplierProduct not found");
                }

                const supplierId = supplierProduct.supplier;

                if (!groupedItems.has(supplierId)) {
                    groupedItems.set(supplierId, []);
                }

                groupedItems.get(supplierId)!.push(item);
            }

            const createdOrders: PurchaseOrder[] = [];

            // Crear una orden por proveedor
            for (const [supplierId, items] of groupedItems) {
                const order = new PurchaseOrder(
                    new Date(),
                    PurchaseOrderStatus.Pending,
                    input.manager,
                    supplierId
                );

                em.persist(order);

                await em.flush();

                let totalAmount = 0;

                // Crear los detalles de la orden
                for (const item of items) {
                    const supplierProduct = await em.findOne(
                        SupplierProduct,
                        { id: item.supplierProduct }
                    );

                    if (!supplierProduct) {
                        throw new Error("SupplierProduct not found");
                    }

                    const purchaseOrderItem = new PurchaseOrderItem(
                        item.quantity,
                        supplierProduct.price,
                        order.id!,
                        supplierProduct.id!
                    );

                    totalAmount += item.quantity * supplierProduct.price;

                    em.persist(purchaseOrderItem);
                }

                order.totalAmount = totalAmount;
                createdOrders.push(order);
            }

            await em.flush();

            return createdOrders;
        });
    }
}