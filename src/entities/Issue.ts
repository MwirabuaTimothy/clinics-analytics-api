import { Arg, Field, ID, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Issue extends BaseEntity{

  @Field(()=>ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column("text")
  name!: string

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
