import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { Project, ProjectMore, ProjectsOnUsers } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { GetProjectsInput } from './dto/get-projects.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddMembersInput } from './dto/add-members-project.input copy';
import { DeleteMembersInput } from './dto/delete-members-project.input';

@Resolver(() => Project)
@UseGuards(AuthGuard)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Mutation(() => Project)
  createProject(@Args('createProjectInput') createProjectInput: CreateProjectInput) {
    return this.projectsService.createProject(createProjectInput);
  }

  @Mutation(() => Project)
  deleteProject(@Args('deleteProjectInput') projectId: number) {
    return this.projectsService.deleteProject(projectId);
  }

  @Mutation(() => Project)
  updateProject(@Args('updateProjectInput') updateProjectInput: UpdateProjectInput) {
    return this.projectsService.updateProject(updateProjectInput);
  }

  @Mutation(() => ProjectsOnUsers)
  addMemberInProject(@Args('addMemberInProjectInput') addMemberInProjectInput: AddMembersInput) {
    return this.projectsService.addMemberInProject(addMemberInProjectInput);
  }

  @Mutation(() => ProjectsOnUsers)
  deleteMemberInProject(@Args('deleteMemberInProjectInput') deleteMemberInProjectInput: DeleteMembersInput) {
    return this.projectsService.deleteMemberInProject(deleteMemberInProjectInput);
  }

  @Query(() => [Project], { name: 'projectsListByOwnerId' })
  getProjectsByOwnerId(@Args('getProjectsInput') getProjectsInput: GetProjectsInput) {
    return this.projectsService.getProjectsByOwnerId(getProjectsInput);
  }

  @Query(() => ProjectMore, { name: 'projectsListById' })
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
