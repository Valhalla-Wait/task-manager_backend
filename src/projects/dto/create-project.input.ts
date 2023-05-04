import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  ownerId: number;
}
