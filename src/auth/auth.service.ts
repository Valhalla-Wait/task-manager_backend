import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginInput } from './dto/login.input';
import * as bcrypt from 'bcrypt'
import * as uuid from 'uuid'
import { MailService } from 'src/mail/mail.service';
import { TokenService } from 'src/token/token.service';
import { RegistrationUserInput } from 'src/auth/dto/registration-user.input';


@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private mailService: MailService, private tokenService: TokenService){}

  async login({email, password}: LoginInput) {
    const candidate = await this.userService.getUserByEmail(email)
    if(!candidate) {
      throw new HttpException('Неверный email или пароль', HttpStatus.BAD_REQUEST) 
    }
    const isPassEquals = await bcrypt.compare(password, (await candidate).password)
    if(!isPassEquals) {
      throw new HttpException('Неверный email или пароль', HttpStatus.BAD_REQUEST)
    }

    //Вынести в отдльеную функцию
    const tokens = this.tokenService.generateTokens({email: candidate.email, isActivated: candidate.isActivated})

    await this.tokenService.saveToken({userId: candidate.id, refreshToken: tokens.refreshToken})

    //Сделать dto чтобы каждый раз не доставать данные по отдельности
    return {
      ...tokens,
      user: {
        id: candidate.id,
        email: candidate.email,
        firstName: candidate.firstName,
        lastName:candidate.lastName,
        isActivated: candidate.isActivated,
      }
    }
  }

  async registration({email, password, firstName, lastName}: RegistrationUserInput) {
    const candidate = await this.userService.getUserByEmail(email)

    if(candidate) {
      throw new HttpException(`Email уже занят`, HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4()

    const user = await this.userService.createUser({email, password: hashPassword, firstName, lastName, activationLink})

    await this.mailService.sendActivationMail(email, `${process.env.API_URL}/auth/activate/${activationLink}`)

    //Вынести в отдльеную функцию
    const tokens = this.tokenService.generateTokens({email: user.email, isActivated: user.isActivated})

    await this.tokenService.saveToken({userId: user.id, refreshToken: tokens.refreshToken})
    
    //Сделать dto чтобы каждый раз не доставать данные по отдельности
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
