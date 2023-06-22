import { CreateTaskInput } from './create-task.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @Field(() => Int)
  id: number;

  @Field(() => Int, {nullable:true})
  statusId?: number;

  @Field(() => [Int], {nullable:true})
  executorIds?: number[];
}
