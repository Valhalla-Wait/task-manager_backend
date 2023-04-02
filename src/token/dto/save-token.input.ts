import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class SaveTokenInput {
  @Field(() => Int)
  userId: number;

  @Field(() => String)
  refreshToken: string;
}
