import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/db/prisma.service';
import { UsersService } from 'src/users/users.service';
import { MailService } from 'src/mail/mail.service';
import { TokenService } from 'src/token/token.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [
    AuthResolver,
    AuthService,
    UsersService,
    PrismaService,
    MailService,
    TokenService,
  ],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'valhalla',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [AuthService, JwtModule, TokenService],
  controllers: [AuthController],
})
export class AuthModule {}
