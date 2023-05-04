import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { GetProjectsInput } from './dto/get-projects.input';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Mutation(() => Project)
  createProject(@Args('createProjectInput') createUserInput: CreateProjectInput) {
    return this.projectsService.createProject(createUserInput);
  }

  @Query(() => [Project], { name: 'projectsListByOwnerId' })
  getProjectsByOwnerId(@Args('getProjectsInput') getProjectsInput: GetProjectsInput) {
    return this.projectsService.getProjectsByOwnerId(getProjectsInput);
  }

  @Query(() => Project, { name: 'projectsListById' })
  getProjectsById(@Args('getProjectByIdInput') projectId: number) {
    return this.projectsService.getProjectById(projectId);
  }

  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.findOne(id);
  // }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.remove(id);
  // }
}
