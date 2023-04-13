import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/db/prisma.service';
import { TokenService } from './token.service';

@Module({
  providers: [TokenService, PrismaService, JwtService],
  exports: [TokenService],
})
export class TokenModule {}
