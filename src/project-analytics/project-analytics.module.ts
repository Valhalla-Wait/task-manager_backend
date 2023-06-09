import { Module } from '@nestjs/common';
import { ProjectAnalyticsService } from './project-analytics.service';
import { ProjectAnalyticsResolver } from './project-analytics.resolver';
import { PrismaService } from 'src/db/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { GroupsService } from 'src/groups/groups.service';
import { UsersService } from 'src/users/users.service';
import { GroupsModule } from 'src/groups/groups.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [ProjectAnalyticsResolver, ProjectAnalyticsService, PrismaService, GroupsService],
  imports:[AuthModule, GroupsModule]
})
export class ProjectAnalyticsModule {}
