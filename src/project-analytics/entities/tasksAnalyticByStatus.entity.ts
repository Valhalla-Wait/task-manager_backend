import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TasksAnalyticByStatus {

  @Field(() => String)
  tasksStatus: string;

  @Field(() => Int)
  tasksCount: number;

  @Field(() => String)
  percent: string;
}
