import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class TaskExecutorRelation {
  @Field(() => Int)
  taskId: number;

  @Field(() => Int)
  executorId: number;

  @Field(() => User)
  executor: User;
}
