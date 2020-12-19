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

  @Field(_type => [Visit])
  @OneToMany(() => Visit, visit => visit.staff)
  visits!: Visit[]
  
}

@Resolver()
export class StaffsResolver {
  
  @Query(()=>[Staff])
  async staffs(): Promise<Staff[]> {
    const staffs = await Staff.find({
      relations: ["visits"]
    });
    return staffs;
  }

  @Mutation(()=>Staff)
  async createStaff(
      @Arg('name') name: string
    ){
      return Staff.create({name}).save()
  }
}
