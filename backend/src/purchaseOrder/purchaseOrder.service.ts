import { PurchaseOrder } from "./purchaseOrder.entity.js";
import { PurchaseOrderRepository } from "./purchaseOrder.repository.js";
import { PurchaseOrderStatus } from "./purchaseOrder.entity.js";
import { CreatePurchaseOrdersInput } from "./purchaseOrder.interface.js";

export class PurchaseOrderService {
    constructor(private readonly repo: PurchaseOrderRepository) { }

    async findAll(): Promise<PurchaseOrder[] | undefined> {
        return await this.repo.findAll();
    }
    async findOne(item: { id: number }): Promise<PurchaseOrder | undefined> {
        return this.repo.findOne({ id: item.id });
    }
    async create(input: PurchaseOrder): Promise<PurchaseOrder | undefined> {
        try {
            const order = new PurchaseOrder(
                input.date,
                input.status,
                input.manager,
                input.supplier
            )
            return await this.repo.add(order);
        } catch (error: any) {
            if (error.code === "ER_DUP_ENTRY") {
                throw new Error("A purchase order with that name already exists.");
            }
            if (error.code === "ER_NO_REFERENCED_ROW_2") {
                throw new Error("The supplier ID entered is invalid");
            }
            throw error;
        }
    }
    async update(id: number, input: Partial<PurchaseOrder>): Promise<PurchaseOrder | undefined> {
        const order = await this.repo.findOne({ id });
        if (!order) {
            return undefined;
        }
        order.date = input.date ?? order.date;
        order.status = input.status ?? order.status;
        order.manager = input.manager ?? order.manager;
        return await this.repo.update(id, order);
    }
    async remove(id: number): Promise<PurchaseOrder | undefined> {
        const purchaseOrder = await this.repo.findOne({ id });
        if (!purchaseOrder) return undefined;
        if (purchaseOrder.status === PurchaseOrderStatus.Received) {
            throw new Error("Cannot delete a received purchase order");
        }

        return await this.repo.delete({ id });
    }
    async receive(id: number): Promise<PurchaseOrder | undefined> {
        return await this.repo.receive(id);
    }
    async cancel(id: number): Promise<PurchaseOrder | undefined> {
        return await this.repo.cancel(id);
    }
    async createMultiple(input: CreatePurchaseOrdersInput): Promise<PurchaseOrder[] | undefined> {
        if (!input.manager || !input.items || input.items.length === 0) {
            throw new Error("Invalid Purchase order data");
        }
        for (const item of input.items) {
            if (
                !Number.isInteger(item.supplierProduct) ||
                item.supplierProduct <= 0 ||
                !Number.isInteger(item.quantity) ||
                item.quantity <= 0
            ) {
                throw new Error("Invalid Purchase order item");
            }

        } // validamos : 
        // Que exista un administrador indicado.
        // Que haya al menos un producto
        // Que cada supplierProduct sea un ID válido.
        // Que las cantidades sean números enteros positivos.
        return await this.repo.createMultiple(input);
    }
}