import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  providers: [ProjectsResolver, ProjectsService, PrismaService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
