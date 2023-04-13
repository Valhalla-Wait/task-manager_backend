import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { RegistrationUserInput } from 'src/auth/dto/registration-user.input';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { LoginUserData } from './entities/loginUser.entity';
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
  @Query(() => LoginUserData, { name: 'login' })
    async login(
      @Args('loginInput') loginInput: LoginInput,
      @Context("req") req: Request
    ) {
      const userData = await this.authService.login(loginInput);
      req.res?.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return userData
    }
}
