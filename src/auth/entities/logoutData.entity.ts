import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LogoutData {
  @Field(() => String)
  message: string;
}
