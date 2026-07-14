// import { IRepository } from "../shared/base.repository.js";
// import { OrderItem } from "./orderItem.entity.js";
// import { ORDER_ITEMS_MOCK } from "./orderItem.mock.js";


// export class OrderItemRepository implements IRepository<OrderItem>{
//     private orderItems : OrderItem[] = ORDER_ITEMS_MOCK;

//     public findAll(): OrderItem[] | undefined {
//         return this.orderItems;
//     }

//     public findOne(item: { id: string; }): OrderItem | undefined {
//         return this.orderItems.find((orderItem) => orderItem.id === item.id);
//     }
    
//     public add(item: OrderItem): OrderItem | undefined {
//         this.orderItems.push(item);
//         return item;
//     }
    
//     public update(item: OrderItem): OrderItem | undefined {
//         const orderItemToUpdate = this.orderItems.findIndex((orderItem) => orderItem.id === item.id);
//         if(orderItemToUpdate < 0){
//             return undefined
//         }
//         ORDER_ITEMS_MOCK[orderItemToUpdate] = {...this.orderItems[orderItemToUpdate],...item};
//         return this.orderItems[orderItemToUpdate];
//     }

//     public delete(item: { id: string; }): { id: string; } | undefined {
//         const orderItemToDelete = this.orderItems.findIndex((orderItem) => orderItem.id === item.id);
//         if(orderItemToDelete < 0){
//             return undefined
//         }
//         this.orderItems.splice(orderItemToDelete,1);
//         return {id: item.id};
//     }
// }
