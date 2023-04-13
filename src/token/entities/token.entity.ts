import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Token {
  @Field(() => ID)
  userId: number;

  @Field(() => String)
  refreshToken: string;
}
