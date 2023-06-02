import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { PrismaService } from 'src/db/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ProjectsResolver, ProjectsService, PrismaService],
  imports:[AuthModule],
  exports: [ProjectsService],
})
export class ProjectsModule {}
