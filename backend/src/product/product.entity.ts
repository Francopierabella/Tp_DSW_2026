// To be updated


import {Entity,Property} from "@mikro-orm/core";
import {BaseEntity} from "../shared/baseEntity.entity.js";

@Entity()
export class Product extends BaseEntity{
    @Property({nullable:false})
    name!:string;
    @Property({nullable:false})
    description!: string;
    @Property ({nullable:false})
    brand!: string
    @Property ({nullable:false})
    gender!:string
    @Property ({nullable:false})
    price!: Number
    @Property ({nullable:false})
    stock!: Number

    constructor(name:string,description:string,brand:string,gender:string,price:number,stock:number){
        super();
        this.name = name;
        this.description = description;
        this.brand = brand;
        this.gender = gender;
        this.price = price;
        this.stock = stock;
    }
}