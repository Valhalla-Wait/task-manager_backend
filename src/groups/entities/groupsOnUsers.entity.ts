import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class GroupOnUsers {
  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  groupId: number;

  @Field(() => GraphQLISODateTime)
  assignedAt: string;

  @Field(() => String)
  assignedBy: string;
}