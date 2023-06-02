import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaService } from 'src/db/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [UsersResolver, UsersService, PrismaService],
  imports:[forwardRef(() => AuthModule)],
  exports: [UsersService],
})
export class UsersModule {}
