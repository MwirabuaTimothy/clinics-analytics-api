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

  @Field()
  @Column("text")
  location!: string
  
  @Field(_type => [Visit])
  @OneToMany(() => Visit, visit => visit.issue)
  visits!: Visit[]
  
  @Field()
  visitsCount!: number
  
}

@Resolver()
export class IssuesResolver {
  
  @Query(()=>[Issue])
  async issues(): Promise<Issue[]> {
    const issues = await Issue.find({
      relations: ["visits"]
    });
    return issues;
  }

  @Mutation(()=>Issue)
  async createIssue(
      @Arg('name') name: string,
      @Arg('location') location: string
    ){
      return Issue.create({name, location}).save()
  }
}
