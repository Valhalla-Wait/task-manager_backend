import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { RegistrationUserInput } from 'src/users/dto/registration-user.input';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RegistratedUserData } from './entities/registratedUser.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => RegistratedUserData, { name: 'registration' })
  async registration(
    @Args('registrationUserInput') registrationUserInput: RegistrationUserInput,
    @Context("req") req: Request
  ) {
    const userData = await this.authService.registration(registrationUserInput);
    
    req.res?.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    return userData
  }

  //Fix return type, DO IT AFTER REGISTRATION AND MAILER
  @Query(() => [User], { name: 'login' })
    login(@Args('loginInput') loginInput: LoginInput) {
      return this.authService.login(loginInput);
    }
}
