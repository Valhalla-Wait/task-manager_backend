import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class GetProjectAnalyticInput {
  @Field(() => Int)
  projectId: number;
}
