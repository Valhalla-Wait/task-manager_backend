import { InputType, Field, Int, PickType } from '@nestjs/graphql';
import { CreateProjectInput } from './create-project.input';

@InputType()
export class GetProjectsInput extends PickType(CreateProjectInput, [
  'ownerId'
] as const) {}
