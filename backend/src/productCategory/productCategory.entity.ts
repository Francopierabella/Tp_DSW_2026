import 
{Entity,Property}
from "@mikro-orm/core";
import {BaseEntity} from "../shared/baseEntity.entity.js";

// @Entity() => Esta clase representa una tabla 
@Entity()
export class ProductCategory extends BaseEntity {
// ! => Atributo obligatorio
    @Property({nullable: false,unique: true,})
    name!:string;
    constructor(name:string){
        super();
        this.name = name;
    }
}

