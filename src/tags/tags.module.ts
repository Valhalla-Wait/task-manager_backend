import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsResolver } from './tags.resolver';
import { PrismaService } from 'src/db/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { TasksService } from 'src/tasks/tasks.service';

@Module({
  providers: [TagsResolver, TagsService, PrismaService, TasksService],
  imports:[AuthModule]
})
export class TagsModule {}
