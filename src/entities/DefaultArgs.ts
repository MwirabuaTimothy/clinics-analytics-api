import { ArgsType, Field } from "type-graphql";
import { Min, Max } from "class-validator";

@ArgsType()
export class DefaultArgs {
  @Field({ defaultValue: 0 })
  @Min(0)
  skip!: number;

  @Field()
  @Min(1)
  @Max(100)
  take:number = 20; // default

  @Field()
  page:number = 1; // default
  
  @Field()
  orderBy:string = 'id'; // default

  @Field()
  ascending!: boolean;

  // @Field({ nullable: true })
  // match: {[key: string]: string } = {};
  
  @Field({ nullable: true })
  clinicId!: number;
  
  @Field({ nullable: true })
  issueId!: number;
  
  @Field({ nullable: true })
  startDate!: number;
  
  @Field({ nullable: true })
  endDate!: number;

  // helpers - index calculations
  get startIndex(): number {
    return this.skip;
  }
  get endIndex(): number {
    return this.skip + this.take;
  }
}