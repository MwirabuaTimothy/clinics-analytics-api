import { Arg, Field, ID, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Clinic } from "./Clinic";
import { Issue } from "./Issue";

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
  @Column("timestamp")
  time!: string
  
  @Field()
  @Column("integer")
  fee!: number
  
  @Field()
  @Column("integer")
  promoter_score!: number
  
  @OneToOne(_type => Clinic) @JoinColumn() 
  clinic!: Clinic;
  
  @OneToOne(_type => Issue) @JoinColumn() 
  issue!: Issue;
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
      @Arg('clinic_id') clinic_id: number, 
      @Arg('issue_id') issue_id: number
    ){
      
      let clinic = await Clinic.findOne(clinic_id);
      let issue = await Issue.findOne(issue_id);
      if(!clinic){
        throw new Error(`Clinic ${clinic_id} not found!`);
      }
      if(!issue){
        throw new Error(`Issue ${issue_id} not found!`);
      }

      return Visit.create({ patient, time, fee, promoter_score, clinic, issue }).save()
  }
}
