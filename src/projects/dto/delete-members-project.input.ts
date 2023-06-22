import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class DeleteMembersInput {

  @Field(() => Int)
  memberId: number;

  @Field(() => Int)
  projectId: number;
}
