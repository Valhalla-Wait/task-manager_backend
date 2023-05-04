import { InputType, Field, Int, OmitType, IntersectionType } from '@nestjs/graphql';
import { Group } from '../entities/group.entity';

@InputType()
class GroupInfo extends OmitType(Group, [
  'id'
]){}

@InputType()
class AdditionalGroupInfo{

  @Field(() => String)
  assignedBy: string;

  @Field(() => [Int], {nullable: true})
  membersIds?: number[];
}

@InputType()
export class CreateGroupInput extends IntersectionType(GroupInfo,AdditionalGroupInfo){}