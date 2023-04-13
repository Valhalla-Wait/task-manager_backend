import { ObjectType, Field, ID, OmitType } from '@nestjs/graphql';

@ObjectType()
export class LogoutData {
  @Field(() => String)
  message: string;
}