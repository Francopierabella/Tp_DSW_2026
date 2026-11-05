import { Enum, Entity, Property, ManyToOne, Collection, OneToMany, Cascade } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { Manager } from "../manager/manager.entity.js";
import { PurchaseOrderItem } from "../purchaseOrderItem/purchaseOrderItem.entity.js";
import { Supplier } from "../supplier/supplier.entity.js";

export enum PurchaseOrderStatus {
  Pending = 'pending',
  Cancelled = 'cancelled',
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

  @ManyToOne(() => Manager)
  manager!: number;

  @ManyToOne(() => Supplier)
  supplier!: number

  @OneToMany(() => PurchaseOrderItem, purchaseOrderItem => purchaseOrderItem.purchaseOrder, { cascade: [Cascade.REMOVE] })
  purchaseOrderItems = new Collection<PurchaseOrderItem>(this);

  constructor(date: Date, status: PurchaseOrderStatus, manager: number, supplier: number) {
    super();
    this.date = date;
    this.status = status;
    this.manager = manager;
    this.supplier = supplier;
    this.totalAmount = 0;
  }

}