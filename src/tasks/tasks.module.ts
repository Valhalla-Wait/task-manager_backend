import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';
import { PrismaService } from 'src/db/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [TasksResolver, TasksService, PrismaService],
  imports:[AuthModule]
})
export class TasksModule {}
