import { Arg, Field, ID, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Clinic } from "./Clinic";
import { Issue } from "./Issue";

import * as Faker from "faker"
import { define } from "typeorm-seeding"


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
  
  @Column({ type: "int", nullable: true })
  clinicId!: number;
  
  @ManyToOne(() => Clinic, clinic => clinic.visits) 
  clinic!: Clinic;
  
  @Column({ type: "int", nullable: true })
  issueId!: number;

  @ManyToOne(() => Issue, issue => issue.visits) 
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
      @Arg('clinicId') clinicId: number, 
      @Arg('issueId') issueId: number
    ){
      return Visit.create({ patient, time, fee, promoter_score, clinicId, issueId }).save()
  }
}

// user.factory.ts
define(Visit, (faker: typeof Faker) => {
  const visit = new Visit()
  const gender = faker.random.number(1)
  visit.patient = faker.name.firstName(gender) + ' ' + faker.name.lastName(gender)
  visit.time = faker.date.between('2019-12-01', '2020-12-01').toDateString()
  visit.fee = (Math.floor(Math.random() * 40)*50) + 500
  visit.promoter_score = Math.floor(Math.random() * 5) + 6
  visit.clinicId = Math.floor(Math.random() * 6) + 1
  visit.issueId = Math.floor(Math.random() * 6) + 1
  return visit
})
