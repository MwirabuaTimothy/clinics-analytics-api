import { Arg, Args, ArgsType, Field, ID, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { BaseEntity, Column, Entity,  OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Visit } from "./Visit";

@ObjectType()
@Entity()
export class Clinic extends BaseEntity{

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
  @OneToMany(() => Visit, visit => visit.clinic)
  visits!: Visit[]

  @Field()
  visitsCount!: number;
  
  @Field()
  visitsTime!: number;
}

@ArgsType()
export class DefaultArgs {
  @Field({ nullable: true })
  startDate!: number;
  
  @Field({ nullable: true })
  endDate!: number;
}

@Resolver()
export class ClinicsResolver {


  @Query(()=>[Clinic])
  async clinics(
    @Args() {startDate, endDate }: DefaultArgs
    ): Promise<Clinic[]> {
    const clinics = await Clinic.find({
      relations: ["visits"],
      // join: {
      //   alias: "clinic",
      //   leftJoinAndSelect: {
      //     visitTime: "clinic__visits.visits"
      //   },
      // },
      // where: { clinic__visits: Between(new Date('2020-12-23'), new Date()) },
    });

    clinics.map(clinic => {
      // clinic.visitsCount = clinic.visits.length
      clinic.visitsCount = clinic.visits.filter(visit => {
        // return new Date(visit.time).getDate() == new Date('2020-12-23').getDate()
        return new Date(visit.time) >= new Date(startDate)
          && new Date(visit.time) < new Date(endDate)
      }).length
    })
    
    return clinics;
  }

  @Mutation(()=>Clinic)
  async createClinic(
      @Arg('name') name: string, 
      @Arg('location') location: string
    ){
      return Clinic.create({name, location}).save()
  }
}
