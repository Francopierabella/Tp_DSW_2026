// To be updated


// import { IRepository } from "../shared/base.repository.js";
// import { PurchaseOrderItem } from "./purchasePurchaseOrderItem.entity.js";
// import { ORDER_ITEMS_MOCK } from "./purchasePurchaseOrderItem.mock.js";


// export class PurchaseOrderItemRepository implements IRepository<PurchaseOrderItem>{
//     private purchasePurchaseOrderItems : PurchaseOrderItem[] = ORDER_ITEMS_MOCK;

//     public findAll(): PurchaseOrderItem[] | undefined {
//         return this.purchasePurchaseOrderItems;
//     }

//     public findOne(item: { id: string; }): PurchaseOrderItem | undefined {
//         return this.purchasePurchaseOrderItems.find((purchasePurchaseOrderItem) => purchasePurchaseOrderItem.id === item.id);
//     }
    
//     public add(item: PurchaseOrderItem): PurchaseOrderItem | undefined {
//         this.purchasePurchaseOrderItems.push(item);
//         return item;
//     }
    
//     public update(item: PurchaseOrderItem): PurchaseOrderItem | undefined {
//         const purchasePurchaseOrderItemToUpdate = this.purchasePurchaseOrderItems.findIndex((purchasePurchaseOrderItem) => purchasePurchaseOrderItem.id === item.id);
//         if(purchasePurchaseOrderItemToUpdate < 0){
//             return undefined
//         }
//         ORDER_ITEMS_MOCK[purchasePurchaseOrderItemToUpdate] = {...this.purchasePurchaseOrderItems[purchasePurchaseOrderItemToUpdate],...item};
//         return this.purchasePurchaseOrderItems[purchasePurchaseOrderItemToUpdate];
//     }

//     public delete(item: { id: string; }): { id: string; } | undefined {
//         const purchasePurchaseOrderItemToDelete = this.purchasePurchaseOrderItems.findIndex((purchasePurchaseOrderItem) => purchasePurchaseOrderItem.id === item.id);
//         if(purchasePurchaseOrderItemToDelete < 0){
//             return undefined
//         }
//         this.purchasePurchaseOrderItems.splice(purchasePurchaseOrderItemToDelete,1);
//         return {id: item.id};
//     }
// }
