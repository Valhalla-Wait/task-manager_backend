import { InputType, Field, Int, PickType } from '@nestjs/graphql';
import { AddUserGroupInput } from './add-user-group.input';

@InputType()
export class DeleteMembersGroupInput extends PickType(AddUserGroupInput, [
  'groupId',
  'userId'
] as const) {}