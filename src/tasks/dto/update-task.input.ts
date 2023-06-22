import { CreateLightTaskInput, CreateTaskInput } from './create-task.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  statusId: number;
}


@InputType()
export class UpdateLightTaskInput extends PartialType(CreateLightTaskInput) {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  statusId: number;
}