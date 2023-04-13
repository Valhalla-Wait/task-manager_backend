import { InputType, OmitType, PickType } from "@nestjs/graphql";
import { CreateUserInput } from "./create-user.input";

@InputType()
export class RegistrationUserInput extends PickType(CreateUserInput, [
    'email',
    'password',
    'firstName',
    'lastName'
] as const) {}