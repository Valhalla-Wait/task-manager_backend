import { ObjectType, Field, Int, GraphQLISODateTime, ID } from '@nestjs/graphql';
import { OmitType, PickType } from '@nestjs/swagger';
import { Status } from 'src/statuses/entities/status.entity';
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

  @Field(() => Status)
  status:{
    name: string
  };

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


@ObjectType()
export class LightTaskData {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  authorId: number;

  @Field(() => String)
  status:string;

  @Field(() => GraphQLISODateTime)
  createdAt: string;

  @Field(() => GraphQLISODateTime)
  deadline: Date;

  @Field(() => Int)
  projectId: number;

  @Field(() => [User])
  executor: User[];
}