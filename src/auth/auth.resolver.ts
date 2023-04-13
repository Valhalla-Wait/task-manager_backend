import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { RegistrationUserInput } from 'src/auth/dto/registration-user.input';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { LoginUserData } from './entities/loginUser.entity';
import { RegistratedUserData } from './entities/registratedUser.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Token } from 'src/token/entities/token.entity';
import { LogoutInput } from './dto/logout.input';
import { LogoutData } from './entities/logoutData.entity';

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

  @Query(() => LoginUserData, { name: 'login' })
    async login(
      @Args('loginInput') loginInput: LoginInput,
      @Context("req") req: Request
    ) {
      const userData = await this.authService.login(loginInput);
      req.res?.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return userData
    }

  @Query(() => LogoutData, { name: 'logout' })
    async logout(
      @Args('logoutInput') {userId}: LogoutInput,
      @Context("req") req: Request
    ) {
      // const {refreshToken} = req.cookies
      const tokenData = await this.authService.logout(userId);
      req.res?.clearCookie('refreshToken')
      return {
        message: "Logout success!"
      }
    }
}
