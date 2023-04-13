import { ObjectType, Field, OmitType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
class LoginUser extends OmitType(User, [
  'password',
  'activationLink',
] as const) {}

@ObjectType()
export class LoginUserData {
  @Field(() => LoginUser)
  user: LoginUser;

  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}
