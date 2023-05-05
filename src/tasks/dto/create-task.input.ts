import { InputType, Int, Field, ID, GraphQLISODateTime, OmitType } from '@nestjs/graphql';
import { Task } from '../entities/task.entity';

@InputType()
export class CreateTaskInput extends OmitType(Task, [
  'id',
  'createdAt'
] as const) {}