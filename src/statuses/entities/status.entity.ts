import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Status {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;
}
