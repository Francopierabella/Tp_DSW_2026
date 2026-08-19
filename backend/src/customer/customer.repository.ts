// To be updated

// import { IRepository } from "../shared/base.repository.js";
// import { Customer } from "./customer.entity.js";
// import { pool } from "../shared/db/conn.mysql.js";
// import { ResultSetHeader, RowDataPacket } from "mysql2";

// export class CustomerRepository implements IRepository<Customer>{
    
//     public async findAll(): Promise< Customer[] | undefined > {
//        const [customers] =  await pool.query(
//         'select * from customers'
//         );
//         return customers as Customer[];
// // const [customer] = await pool.query(...);
// //"Tomá el primer elemento del arreglo que devuelve query() (las filas o el resultado de la operación) y guardalo en la variable customer, ignorando el segundo elemento (fields)."
//     }
//     public async findOne (item : {id:number}) : Promise<Customer | undefined > {
//         const[customers] = await pool.query<RowDataPacket[]>('select * from customers where id = ?',[item.id]);
//         return customers.length > 0
//         ? (customers[0] as Customer)
//         : undefined;
        
//     }
//     public async  add(item : Omit<Customer,"id">) : Promise < Customer | undefined >{
//         const [result] = await pool.query<ResultSetHeader>(
//             ` insert into customers 
//             (name,lastName,phone,address,healthInsuranceId,e_mail,password)
//             values (?,?,?,?,?,?,?)`,
//             [   item.name,
//                 item.lastName,
//                 item.phone,
//                 item.address,
//                 item.healthInsuranceId,
//                 item.e_mail,
//                 item.password,
//             ]
//         );
//         return await this.findOne({id:result.insertId});
//     }
//     public async update(id: number, customerInput : Customer) : Promise < Customer | undefined >{
//          const { id: _, ...customerRow } = customerInput;
//          await pool.query(`
//             update customers set ? where id = ?
//             `,[customerRow,id]);
//             return await this.findOne({id});
//     }
//     public async delete(item: { id: number }): Promise < Customer | undefined >{
//     try{
//         const customerToDelete = await this.findOne(item);
        
//         await pool.query(`
//             delete from customers where id = ?
//             `,[item.id]);
//         return customerToDelete;
//     }catch(error:any){
//         throw new Error('unable to delete customer');
//     }
// }
// }