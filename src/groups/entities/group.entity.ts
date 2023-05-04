import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Group {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  leadId: number;

  @Field(() => Int)
  projectId: number;

}