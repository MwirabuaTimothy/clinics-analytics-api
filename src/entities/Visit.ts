import { Arg, Field, ID, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Visit extends BaseEntity{

  @Field(()=>ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column("text")
  patient!: string
  
  @Field()
  @Column("text")
  time!: string
  
  @Field()
  @Column("text")
  fee!: number
  
  @Field()
  @Column("text")
  promoter_score!: number
  
  @Field()
  @Column("text")
  clinic!: number // todo: relation
  
  @Field()
  @Column("text")
  issue!: number // todo: relation

}

@Resolver()
export class VisitsResolver {
  
  @Query(()=>[Visit])
  async visits(){
    return Visit.find();
  }
  @Mutation(()=>Visit)
  async createVisit(
      @Arg('patient') patient: string, 
      @Arg('time') time: string,
      @Arg('fee') fee: number, 
      @Arg('promoter_score') promoter_score: number,
      @Arg('clinic') clinic: number, 
      @Arg('issue') issue: number
    ){
      return Visit.create({ patient, time, fee, promoter_score, clinic, issue }).save()
  }
}
