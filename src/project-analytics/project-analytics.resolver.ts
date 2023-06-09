import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectAnalyticsService } from './project-analytics.service';
import { TasksAnalyticByStatus } from './entities/tasksAnalyticByStatus.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { TasksAnalyticByGroups } from './entities/tasksAnalyticByGroups.entity';
import { getGroupAnalyticInput } from './dto/get-projectAnalyticByGroupId.input';
import { TasksAnalyticByUsers } from './entities/tasksAnalyticByUsers.entity';

@Resolver(() => TasksAnalyticByStatus)
@UseGuards(AuthGuard)
export class ProjectAnalyticsResolver {
  constructor(private readonly projectAnalyticsService: ProjectAnalyticsService) {}

  @Query(() => [TasksAnalyticByStatus], { name: 'projectAnalytics' })
  findByProject(@Args('projectId', { type: () => Int }) projectId: number) {
    return this.projectAnalyticsService.getAnalytic(projectId);
  }

  @Query(() => [TasksAnalyticByGroups], { name: 'projectAnalyticsByGroups' })
  findByGroups(@Args('projectId', { type: () => Int }) projectId: number) {
    return this.projectAnalyticsService.getAnalyticbyGroups(projectId);
  }

  @Query(() => TasksAnalyticByGroups, { name: 'projectAnalyticsByGroupId' })
  findByGroupId(@Args('getGroupAnalyticByIdInput') {projectId, groupId}: getGroupAnalyticInput) {
    return this.projectAnalyticsService.getAnalyticbyGroupId(projectId, groupId);
  }

  @Query(() => [TasksAnalyticByUsers], { name: 'projectAnalyticsByUsers' })
  findByUsers(@Args('projectId', { type: () => Int }) projectId: number) {
    return this.projectAnalyticsService.getAnalyticByUsers(projectId);
  }

  @Query(() => [TasksAnalyticByUsers], { name: 'projectAnalyticsGroupByUsers' })
  findByGroupUsers(@Args('getGroupAnalyticByIdInput') {projectId, groupId}: getGroupAnalyticInput) {
    return this.projectAnalyticsService.getAnalyticGroupByUsers(projectId, groupId);
  }
}
