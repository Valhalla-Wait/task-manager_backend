import { ObjectType, Field } from '@nestjs/graphql';
import { Task } from './task.entity';
import { TaskExecutorRelation } from './taskExecutorRelation.entity';

@ObjectType()
export class CreatedTaskData extends Task {
    @Field(() => [TaskExecutorRelation])
    executors: TaskExecutorRelation[];
}
