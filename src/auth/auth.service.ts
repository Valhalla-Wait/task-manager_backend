import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginInput } from './dto/login.input';
import * as bcrypt from 'bcrypt'
import * as uuid from 'uuid'
import { MailService } from 'src/mail/mail.service';
import { TokenService } from 'src/token/token.service';
import { RegistrationUserInput } from 'src/users/dto/registration-user.input';


@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private mailService: MailService, private tokenService: TokenService){}

    //Сделать login
  async login({email, password}: LoginInput) {
    const candidate = this.userService.getUserByEmail(email)
    if(candidate) return candidate
    else return 'User not found'
  }

  async registration({email, password, firstName, lastName}: RegistrationUserInput) {
    const candidate = await this.userService.getUserByEmail(email)

    if(candidate) {
      throw new HttpException(`Email ${email} уже занят юзером`, HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4()

    const user = await this.userService.createUser({email, password: hashPassword, firstName, lastName, activationLink})

    await this.mailService.sendActivationMail(email, `${process.env.API_URL}/auth/activate/${activationLink}`)

    const tokens = this.tokenService.generateTokens({email: user.email, isActivated: user.isActivated})

    await this.tokenService.saveToken({userId: user.id, refreshToken: tokens.refreshToken})
    
    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName:user.lastName,
        isActivated: user.isActivated,
      }
    }
  }
  async activate(activationLink:string) {
    const user = await this.userService.getUserByActivationLink(activationLink)
    if(!user) {
      throw new Error("Неккоректная ссылка активации");
    }
    return this.userService.activateUserById(user.id)
  }
}
