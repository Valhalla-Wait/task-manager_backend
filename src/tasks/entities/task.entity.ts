import { ObjectType, Field, Int, GraphQLISODateTime, ID } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Task {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  authorId: number;

  @Field(() => Int)
  statusId: number;

  @Field(() => GraphQLISODateTime)
  createdAt: string;

  @Field(() => GraphQLISODateTime)
  deadline: Date;

  @Field(() => Int)
  projectId: number;

  @Field(() => Int)
  groupId: number;
}
