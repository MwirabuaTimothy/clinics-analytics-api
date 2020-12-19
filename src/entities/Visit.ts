import { Args, Arg, Field, ID, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Clinic } from "./Clinic";
import { DefaultArgs } from "./DefaultArgs";
import { Issue } from "./Issue";
import { Staff } from "./Staff";

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
  
  @Column({ type: "int", nullable: true })
  staffId!: number;

  @ManyToOne(() => Staff, staff => staff.visits) 
  staff!: Staff;
}

@Resolver()
export class VisitsResolver {
  
  @Query(()=>[Visit])
  async visits(
    @Args() { orderBy, ascending, startIndex, endIndex }: DefaultArgs
  ): Promise<Visit[]>{
    
    let args:any = {};

    if (orderBy && ascending) {
      args = {
        ...args,
        order: {
          [orderBy]: ascending,
        },
      };
    }

    let visits = await Visit.find(args);

    return visits.slice(startIndex, endIndex);
  }
  @Mutation(()=>Visit)
  async createVisit(
      @Arg('patient') patient: string, 
      @Arg('time') time: string,
      @Arg('fee') fee: number, 
      @Arg('promoter_score') promoter_score: number,
      @Arg('clinicId') clinicId: number, 
      @Arg('issueId') issueId: number,
      @Arg('staffId') staffId: number
    ){
      return Visit.create({ patient, time, fee, promoter_score, clinicId, issueId, staffId }).save()
  }
}
