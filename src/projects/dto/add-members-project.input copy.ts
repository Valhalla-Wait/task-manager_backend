import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class AddMembersInput {

  @Field(() => Int)
  memberId: number;

  @Field(() => Int)
  projectId: number;
}
