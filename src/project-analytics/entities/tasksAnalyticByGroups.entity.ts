import { ObjectType, Field, Int } from '@nestjs/graphql';
import { TasksAnalyticByStatus } from './tasksAnalyticByStatus.entity';

@ObjectType()
export class TasksAnalyticByGroups {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => [TasksAnalyticByStatus])
  analytic: TasksAnalyticByStatus[];
}
