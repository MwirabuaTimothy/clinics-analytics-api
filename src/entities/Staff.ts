import { Arg, Field, ID, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Visit } from "./Visit";

@ObjectType()
@Entity()
export class Staff extends BaseEntity{

  @Field(()=>ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column("text")
  name!: string

  @Field(_type => [Visit])
  @OneToMany(() => Visit, visit => visit.staff)
  visits!: Visit[]
  
  @Field()
  rank!: number;
  @Field()
  efficiency!: number;
  @Field()
  efficiency_delta1!: string;
  @Field()
  efficiency_delta2!: string;
  @Field()
  nps_delta1!: string;
  @Field()
  nps_delta2!: string;
  @Field()
  reported_issues!: number;
  
}

@Resolver()
export class StaffsResolver {
  
  @Query(()=>[Staff])
  async staffs(): Promise<Staff[]> {
    
    
    const staffs = await Staff.find({
      relations: ["visits"]
    });
    
    // add other fields
    let rank = shuffle([1, 2, 3, 4]);
    staffs.forEach((staff, i) => {
      staff.rank = rank[i];
      staff.efficiency = 70 + Math.floor(Math.random() * 30);
      staff.efficiency_delta1 = addComma(10 + Math.floor(Math.random() * 20));
      staff.efficiency_delta2 = addComma(0 + Math.floor(Math.random() * 15));
      staff.nps_delta1 = addComma(10 + Math.floor(Math.random() * 20));
      staff.nps_delta2 = addComma(0 + Math.floor(Math.random() * 15));
      staff.reported_issues = 1 + Math.floor(Math.random() * 9);
    });

    return staffs;
  }

  @Mutation(()=>Staff)
  async createStaff(
      @Arg('name') name: string
    ){
      return Staff.create({name}).save()
  }
}


const shuffle = (array: number[]) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const addComma  = (num: number): string => {
  let str = num.toString().padStart(2, '0')
  return str[0] + "," + str[1];
}