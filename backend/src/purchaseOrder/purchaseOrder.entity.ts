import { Enum, Entity, Property, ManyToOne, Collection, OneToMany } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { Supplier } from "../supplier/supplier.entity.js";
import { PurchaseOrderItem } from "../purchaseOrderItem/purchaseOrderItem.entity.js";

export enum PurchaseOrderStatus {
  Pending = 'pending',
  Delivered = 'delivered',
  Received = 'received'
}

@Entity()
export class PurchaseOrder extends BaseEntity {
  @Property({ nullable: false })
  date!: Date;

  // @Enum({ items: () => PurchaseOrderStatus, nullable: false }) 
  // Define que el atributo "status" solo puede tomar uno de los valores
  // definidos en el enum PurchaseOrderStatus.
  // Indica qué enum debe utilizar MikroORM. Indica que el estado es obligatorio en la BD.
  @Enum({ items: () => PurchaseOrderStatus, nullable: false })
  status!: PurchaseOrderStatus;

  @Property({ nullable: false })
  totalAmount!: number;

  @ManyToOne(() => Supplier)
  supplier!: number;

  @OneToMany(() => PurchaseOrderItem, purchaseOrderItem => purchaseOrderItem.purchaseOrder)
  purchaseOrderItems = new Collection<PurchaseOrderItem>(this);

  constructor(date: Date, status: PurchaseOrderStatus, totalAmount: number, supplier: number) {
    super();
    this.date = date;
    this.status = status;
    this.totalAmount = totalAmount;
    this.supplier = supplier;
  }

}