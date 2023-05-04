import { ObjectType, Field, OmitType, IntersectionType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Group } from './group.entity';

@ObjectType()
class GroupDataDto extends OmitType(Group, [
  'leadId',
] as const){}

@ObjectType()
class AdditionalGroupData {

  @Field(() => User)
  lead: User;

  @Field(() => [User])
  members: User[];
}

@ObjectType()
export class GroupData extends IntersectionType(GroupDataDto,AdditionalGroupData){}

