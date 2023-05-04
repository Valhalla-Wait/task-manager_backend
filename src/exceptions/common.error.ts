import { InternalServerErrorException } from '@nestjs/common';

export class CommonError {
  //Common
  static ServerError() {
    throw new InternalServerErrorException('Ошибка сервера');
  }
}
