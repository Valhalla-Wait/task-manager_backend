import { ObjectType, Field, Int } from '@nestjs/graphql';
import { TasksAnalyticByStatus } from './tasksAnalyticByStatus.entity';

@ObjectType()
export class TasksAnalyticByUsers {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => [TasksAnalyticByStatus])
  analytic: TasksAnalyticByStatus[];
}
