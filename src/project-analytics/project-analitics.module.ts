import { Module } from '@nestjs/common';
import { ProjectAnaliticsService } from './project-analitics.service';
import { ProjectAnaliticsResolver } from './project-analitics.resolver';
import { PrismaService } from 'src/db/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { GroupsService } from 'src/groups/groups.service';
import { UsersService } from 'src/users/users.service';
import { GroupsModule } from 'src/groups/groups.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [ProjectAnaliticsResolver, ProjectAnaliticsService, PrismaService, GroupsService],
  imports:[AuthModule, GroupsModule]
})
export class ProjectAnaliticsModule {}
