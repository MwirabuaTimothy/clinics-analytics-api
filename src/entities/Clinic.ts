import { Arg, Field, ID, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}

@Resolver()
export class ClinicsResolver {
  
  @Query(()=>[Clinic])
  async clinics(){
    return Clinic.find();
  }
  @Mutation(()=>Clinic)
  async createClinic(
      @Arg('name') name: string, 
      @Arg('location') location: string
    ){
      return Clinic.create({name, location}).save()
  }
}
