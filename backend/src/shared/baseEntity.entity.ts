import { PrimaryKey } from '@mikro-orm/core'

export abstract class BaseEntity {
  @PrimaryKey()
  id?: number

  constructor(id?:number){
    this.id = id;
  }
  /*

  @Property({ type: DateTimeType })
  createdAt? = new Date()

  @Property({
    type: DateTimeType,
    onUpdate: () => new Date(),
  })
  updatedAt? = new Date()

  */
}