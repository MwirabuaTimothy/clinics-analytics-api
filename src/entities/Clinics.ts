import { Field, ID, ObjectType, Query, Resolver } from "type-graphql";
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

}

@Resolver()
export class ClinicsResolver {
  
  @Query(()=>[Clinic])
  async clinics(){
    return Clinic.find();
  }
}