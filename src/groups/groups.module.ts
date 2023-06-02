import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/db/prisma.service';
import { UsersService } from 'src/users/users.service';
import { GroupsResolver } from './groups.resolver';
import { GroupsService } from './groups.service';

@Module({
  providers: [GroupsResolver, GroupsService, PrismaService, UsersService],
  imports:[AuthModule],
  exports: [GroupsService],
})
export class GroupsModule {}