// To be updated


// import { IRepository } from "../shared/base.repository.js";
// import { PurchaseOrderItem } from "./purchasePurchaseOrderItem.entity.js";

// export class PurchaseOrderItemService {
//     constructor(private repo: IRepository<PurchaseOrderItem>){}

//     findAll(): PurchaseOrderItem[] | undefined{
//         return this.repo.findAll();
//     }
//     findOne(id:string) : PurchaseOrderItem | undefined {
//         return this.repo.findOne({id});
//     }
//     create(input : Omit<PurchaseOrderItem,"id">): PurchaseOrderItem {
//         const purchasePurchaseOrderItem = new PurchaseOrderItem (
//             input.quantity,
//             input.productId,
//             input.orderId,
//         );
//         this.repo.add(purchasePurchaseOrderItem);
//         return purchasePurchaseOrderItem
//     }
//     update(id:string,input: Partial<PurchaseOrderItem>) : PurchaseOrderItem | undefined{
//         return this.repo.update({id,...input} as PurchaseOrderItem);
//     }
//     remove(id:string) : {id:string} | undefined {
//         return this.repo.delete({id});
//     }
// }