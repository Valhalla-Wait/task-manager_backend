import { ObjectType, Field, OmitType, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Token {

  @Field(() => ID)
  userId: number;

  @Field(() => String)
  refreshToken: string;
}