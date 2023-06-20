import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaService } from 'src/db/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { TokenService } from 'src/token/token.service';

@Module({
  providers: [UsersResolver, UsersService, PrismaService, TokenService],
  imports:[forwardRef(() => AuthModule)],
  exports: [UsersService],
})
export class UsersModule {}
