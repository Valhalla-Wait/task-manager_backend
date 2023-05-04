import { InputType, Field, Int, OmitType, IntersectionType, PickType } from '@nestjs/graphql';

@InputType()
export class RenameGroupInput{

  @Field(() => String)
  name: string;

  @Field(() => Int)
  groupId: number;
}