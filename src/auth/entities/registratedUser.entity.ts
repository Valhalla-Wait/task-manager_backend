import { ObjectType, Field, OmitType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
class RegistratedUser extends OmitType(User, [
  'password',
  'activationLink',
] as const) {}

@ObjectType()
export class RegistratedUserData {
  @Field(() => RegistratedUser)
  user: RegistratedUser;

  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}
