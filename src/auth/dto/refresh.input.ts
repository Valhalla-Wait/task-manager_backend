import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class RefreshInput {

  @Field(() => Int)
  userId: number;

  @Field(() => String)
  refreshToken: string;

}