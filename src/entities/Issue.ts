import { Arg, Field, ID, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Visit } from "./Visit";

@ObjectType()
@Entity()
export class Issue extends BaseEntity{

  @Field(()=>ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column("text")
  name!: string
  
  @OneToMany(() => Visit, visit => visit.issue)
  visits!: Visit[]

}

@Resolver()
export class IssuesResolver {
  
  @Query(()=>[Issue])
  async issues(){
    return Issue.find();
  }
  @Mutation(()=>Issue)
  async createIssue(
      @Arg('name') name: string
    ){
      return Issue.create({name}).save()
  }
}
