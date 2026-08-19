// To be updated

import {Entity,Property} from "@mikro-orm/core";
import {BaseEntity} from "../shared/baseEntity.entity.js";

@Entity()
export class PurchaseOrderItem extends BaseEntity {
  @Property({ nullable: false })
  quantity!: number;

  @Property({ nullable: false })
  productId!: string;

  @Property({ nullable: false })
  orderId!: string;

  constructor(quantity: number, productId: string, orderId: string) {
    super();
    this.quantity = quantity;
    this.productId = productId;
    this.orderId = orderId;
  }
}
