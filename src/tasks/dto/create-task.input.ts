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

  @Field(() => Int, {nullable: true})
  groupId: number;

  @Field(() => [Int], {nullable: true})
  tagIds: number[];

  @Field(() => [Int])
  executorIds: number[];
}

@InputType()
export class CreateLightTaskInput {

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

  @Field(() => [Int])
  executorIds: number[];
}