import { InputType, Int, Field, GraphQLISODateTime } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  authorId: number;

  @Field(() => GraphQLISODateTime)
  deadline: Date;

  @Field(() => Int)
  projectId: number;

  @Field(() => Int)
  groupId: number;

  @Field(() => [Int])
  tagIds: number[];

  @Field(() => [Int])
  executorIds: number[];
}