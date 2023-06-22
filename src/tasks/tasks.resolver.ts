import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateLightTaskInput, CreateTaskInput } from './dto/create-task.input';
import { UpdateLightTaskInput, UpdateTaskInput } from './dto/update-task.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { LightTaskData, TaskData } from './entities/taskData.entity';

@Resolver(() => Task)
@UseGuards(AuthGuard)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => TaskData)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.tasksService.create(createTaskInput);
  }
  // LIGHT TASKS
  @Mutation(() => LightTaskData)
  createLightTask(@Args('createLightTaskInput') createLightTaskInput: CreateLightTaskInput) {
    return this.tasksService.createLightTask(createLightTaskInput);
  }
  @Query(() => [LightTaskData])
  getLighTasksByProjectId(@Args('projectId', { type: () => Int }) projectId:number) {
    return this.tasksService.getLightTasksByProjectId(projectId);
  }
  @Mutation(() => LightTaskData)
  updateLightTask(@Args('updateLightTaskInput') updateLightTaskInput: UpdateLightTaskInput) {
    return this.tasksService.updateLightTask(updateLightTaskInput.id, updateLightTaskInput);
  }
  @Mutation(() => LightTaskData)
  deleteLightTask(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.removeLightTask(id);
  }
  // LIGHT TASKS

  @Query(() => [TaskData], { name: 'tasksByProjectId' })
  findAll(@Args('projectId', { type: () => Int }) projectId:number) {
    return this.tasksService.getTasksByProjectId(projectId);
  }

  @Query(() => TaskData, { name: 'taskById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.findOne(id);
  }

  @Mutation(() => TaskData)
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.tasksService.update(updateTaskInput.id, updateTaskInput);
  }

  @Mutation(() => TaskData)
  deleteTask(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.remove(id);
  }
}
