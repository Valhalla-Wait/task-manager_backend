import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class getGroupAnalyticInput {
  @Field(() => Int)
  projectId: number;

  @Field(() => Int)
  groupId: number;
}
