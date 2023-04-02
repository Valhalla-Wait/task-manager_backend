import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GenerateTokenInput {
  @Field(() => String)
  email: string;

  @Field(() => Boolean)
  isActivated: boolean;
}
