// import { IRepository } from "../shared/base.repository.js";
// import { OrderItem } from "./orderItem.entity.js";

// export class OrderItemService {
//     constructor(private repo: IRepository<OrderItem>){}

//     findAll(): OrderItem[] | undefined{
//         return this.repo.findAll();
//     }
//     findOne(id:string) : OrderItem | undefined {
//         return this.repo.findOne({id});
//     }
//     create(input : Omit<OrderItem,"id">): OrderItem {
//         const orderItem = new OrderItem (
//             input.quantity,
//             input.productId,
//             input.orderId,
//         );
//         this.repo.add(orderItem);
//         return orderItem
//     }
//     update(id:string,input: Partial<OrderItem>) : OrderItem | undefined{
//         return this.repo.update({id,...input} as OrderItem);
//     }
//     remove(id:string) : {id:string} | undefined {
//         return this.repo.delete({id});
//     }
// }