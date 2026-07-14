
import { IRepository } from "../shared/base.repository.js";
import { ProductCategory } from "./productCategory.entity.js";
import { pool } from "../shared/db/conn.mysql.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";


export class ProductCategoryRepository implements IRepository<ProductCategory> {
    public async findAll(): Promise<ProductCategory[] | undefined> {
        const [productsCategories] = await pool.query(`
            select * from productcategories
            `);
            return productsCategories as ProductCategory[];
    }
    public async findOne(item: { id: number; }): Promise<ProductCategory | undefined> {
        const [productCategories] = await pool.query<RowDataPacket[]>(`
            select * from productcategories where id = ?
            `,[item.id]);
            return productCategories.length > 0 
            ? (productCategories[0] as ProductCategory)
            : undefined;
    }
    public async add(item: Omit<ProductCategory,'id'>): Promise<ProductCategory | undefined> {
        const [result] = await pool.query<ResultSetHeader>(
                `insert into productcategories 
                (name) values (?)`,[item.name]

        );
        return await this.findOne({id:result.insertId});
    }
    public async update(id: number, productCategoryInput: ProductCategory): Promise<ProductCategory | undefined> {
        const {id:_,...productCategoryRow} = productCategoryInput;
        await pool.query(
            `update productcategories set ? where id = ?`,[productCategoryRow,id]
        );
        return await this.findOne({id});
    }
    public async delete(item: { id: number; }): Promise<ProductCategory | undefined> {
        try{
            const productCategoryToDelete = await this.findOne(item);
            await pool.query(
                `delete from productcategories where id = ?`,[item.id]
            );
            return productCategoryToDelete;
        }catch(error:any){
            throw new Error("unable to delete productCategory");
        }
    }
}