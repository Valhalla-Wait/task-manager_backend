import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import {JwtModule} from "@nestjs/jwt"
import { PrismaService } from 'src/db/prisma.service';
import { PrismaModule } from 'src/db/prisma.module';
import { UsersService } from 'src/users/users.service';
import { MailService } from 'src/mail/mail.service';
import { TokenService } from 'src/token/token.service';

@Module({
  providers: [AuthResolver, AuthService, UsersService, PrismaService, MailService, TokenService],
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'valhalla',
      signOptions: {
        expiresIn: '24h'
      }
    }),
  ],
})
export class AuthModule {}
