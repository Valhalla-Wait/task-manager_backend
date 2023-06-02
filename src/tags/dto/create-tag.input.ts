import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateTagInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  color: string;

  @Field(() => Int)
  taskId: number;
}
