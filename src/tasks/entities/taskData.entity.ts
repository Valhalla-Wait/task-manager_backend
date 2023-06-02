import { ObjectType, Field, Int, GraphQLISODateTime, ID } from '@nestjs/graphql';
import { OmitType, PickType } from '@nestjs/swagger';
import { Tag } from 'src/tags/entities/tag.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class TaskData {
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

  @Field(() => [User])
  executors: User[];

  @Field(() => [TaskTag])
  tags: TaskTag[];
}

@ObjectType()
class TaskTag {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  color: string;
}
