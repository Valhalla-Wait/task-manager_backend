import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import { RegistrationUserInput } from 'src/auth/dto/registration-user.input';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { LoginUserData } from './entities/loginUser.entity';
import { RegistratedUserData } from './entities/registratedUser.entity';
import { LogoutInput } from './dto/logout.input';
import { LogoutData } from './entities/logoutData.entity';
import { RefreshInput } from './dto/refresh.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => RegistratedUserData, { name: 'registration' })
  async registration(
    @Args('registrationUserInput') registrationUserInput: RegistrationUserInput,
    @Context('res') res: Response,
  ) {
    const userData = await this.authService.registration(registrationUserInput);

    res?.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return userData;
  }

  @Mutation(() => LoginUserData, { name: 'login' })
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context('res') res: Response,
  ) {
    const userData = await this.authService.login(loginInput);
    // res?.cookie('refreshToken', userData.refreshToken, {
    //   maxAge: 30 * 24 * 60 * 60 * 1000,
    //   httpOnly: true,
    // });
    return userData;
  }

  @Query(() => LogoutData, { name: 'logout' })
  async logout(
    @Args('logoutInput') { userId }: LogoutInput,
    @Context('res') res: Response,
  ) {
    await this.authService.logout(userId);
    res?.clearCookie('refreshToken');
    return {
      message: 'Logout success!',
    };
  }

  @Query(() => LoginUserData, { name: 'refresh' })
  async refresh(
    @Args('refreshInput') refreshInput: RefreshInput,
    @Context('res') res: Response,
  ) {
    const userData = await this.authService.refresh(refreshInput);
    res?.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return userData;
  }
}
