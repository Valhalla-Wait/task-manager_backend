import { InputType, OmitType } from "@nestjs/graphql";
import { CreateUserInput } from "../../users/dto/create-user.input";

@InputType()
export class RegistrationUserInput extends OmitType(CreateUserInput, [
    "activationLink"
] as const) {}