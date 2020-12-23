import { ArgsType, Args, Arg, Field, ID, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, Between } from "typeorm";
import { Clinic } from "./Clinic";
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
  
  @Field()
  @Column({ type: "int", nullable: true })
  clinicId!: number;
  
  @ManyToOne(() => Clinic, clinic => clinic.visits) 
  clinic!: Clinic;
  
  @Field()
  @Column({ type: "int", nullable: true })
  issueId!: number;

  @ManyToOne(() => Issue, issue => issue.visits) 
  issue!: Issue;
  
  @Field()
  @Column({ type: "int", nullable: true })
  staffId!: number;

  @ManyToOne(() => Staff, staff => staff.visits) 
  staff!: Staff;
}

@ArgsType()
export class DefaultArgs {
  @Field({ nullable: true })
  clinicId!: number;

  @Field({ nullable: true })
  issueId!: number;

  @Field({ nullable: true })
  startDate!: number;

  @Field({ nullable: true })
  endDate!: number;
}

@Resolver()
export class VisitsResolver {
  
  @Query(()=>[Visit])
  async visits(
    @Args() { clinicId, issueId, startDate, endDate }: DefaultArgs
  ): Promise<Visit[]>{
    
    let args:any = {};
    
    if (clinicId) {
      args = {
        ...args,
        where: {clinicId}
      };
    }
    if (issueId) {
      args = {
        ...args,
        where: {...args.where, issueId}
      };
    }
    if (startDate && endDate) {
      args = {
        ...args,
        where: {...args.where, time: Between(new Date(startDate), new Date(endDate))}
      };
    }

    let visits = await Visit.find(args);

    return visits;
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
