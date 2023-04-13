import { ObjectType, PickType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class TokenPayload extends PickType(User, [
    "email",
    "isActivated"
] as const) {}