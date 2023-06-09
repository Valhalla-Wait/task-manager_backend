import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectAnaliticsService } from './project-analitics.service';
import { TasksAnalyticByStatus } from './entities/tasksAnalyticByStatus.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { TasksAnalyticByGroups } from './entities/tasksAnalyticByGroups.entity';
import { getGroupAnalyticInput } from './dto/get-projectAnalyticByGroupId.input';
import { TasksAnalyticByUsers } from './entities/tasksAnalyticByUsers.entity';

@Resolver(() => TasksAnalyticByStatus)
@UseGuards(AuthGuard)
export class ProjectAnaliticsResolver {
  constructor(private readonly projectAnaliticsService: ProjectAnaliticsService) {}

  @Query(() => [TasksAnalyticByStatus], { name: 'projectAnalitics' })
  findByProject(@Args('projectId', { type: () => Int }) projectId: number) {
    return this.projectAnaliticsService.getAnalytic(projectId);
  }

  @Query(() => [TasksAnalyticByGroups], { name: 'projectAnaliticsByGroups' })
  findByGroups(@Args('projectId', { type: () => Int }) projectId: number) {
    return this.projectAnaliticsService.getAnalyticbyGroups(projectId);
  }

  @Query(() => TasksAnalyticByGroups, { name: 'projectAnaliticsByGroupId' })
  findByGroupId(@Args('getGroupAnalyticByIdInput') {projectId, groupId}: getGroupAnalyticInput) {
    return this.projectAnaliticsService.getAnalyticbyGroupId(projectId, groupId);
  }

  @Query(() => [TasksAnalyticByUsers], { name: 'projectAnaliticsByUsers' })
  findByUsers(@Args('projectId', { type: () => Int }) projectId: number) {
    return this.projectAnaliticsService.getAnalyticByUsers(projectId);
  }

  @Query(() => [TasksAnalyticByUsers], { name: 'projectAnaliticsGroupByUsers' })
  findByGroupUsers(@Args('getGroupAnalyticByIdInput') {projectId, groupId}: getGroupAnalyticInput) {
    return this.projectAnaliticsService.getAnalyticGroupByUsers(projectId, groupId);
  }
}
