import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TaskData } from './entities/taskData.entity';

@Resolver(() => Task)
@UseGuards(AuthGuard)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => TaskData)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.tasksService.create(createTaskInput);
  }

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
