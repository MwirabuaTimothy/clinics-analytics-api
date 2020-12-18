import { Arg, Field, ID, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Visit } from "./Visit";

@ObjectType()
@Entity()
export class Staff extends BaseEntity{

  @Field(()=>ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column("text")
  name!: string

  @OneToMany(() => Visit, visit => visit.staff)
  visits!: Visit[]
  
}

@Resolver()
export class StaffsResolver {
  
  @Query(()=>[Staff])
  async staffs(){
    return Staff.find();
  }
  @Mutation(()=>Staff)
  async createStaff(
      @Arg('name') name: string
    ){
      return Staff.create({name}).save()
  }
}
