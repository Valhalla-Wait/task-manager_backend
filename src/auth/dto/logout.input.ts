import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class LogoutInput {
  @Field(() => Int)
  userId: number;
}
