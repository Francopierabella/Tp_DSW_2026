import { PrimaryKey } from '@mikro-orm/core'

export abstract class BaseEntity {
  @PrimaryKey()
  id?: number

  constructor(id?:number){
    this.id = id;
  }

}