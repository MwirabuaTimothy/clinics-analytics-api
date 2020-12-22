import { Arg, Field, ID, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
}

@Resolver()
export class ClinicsResolver {


  @Query(()=>[Clinic])
  async clinics(): Promise<Clinic[]> {
    const clinics = await Clinic.find({
      relations: ["visits"]
    });

    clinics.map(clinic => {
      clinic.visitsCount = clinic.visits.length
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
