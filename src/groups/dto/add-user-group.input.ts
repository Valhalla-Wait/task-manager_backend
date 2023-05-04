import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class AddUserGroupInput {
  @Field(() => Int)
  groupId: number;

  @Field(() => Int)
  userId: number;

  @Field(() => String)
  assignedBy: string;
}