import { BadRequestException, UnauthorizedException } from '@nestjs/common';

export class AuthError {

  static UnauthorizedError() {
    throw new UnauthorizedException('Пользователь не авторизован');
  }
  static EmailExists() {
    throw new BadRequestException('Email уже занят');
  }
  static IncorrectLoginData() {
    throw new BadRequestException('Неверный email или пароль');
  }
}
