import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CommonError } from 'src/exceptions/common.error';
import { TasksService } from 'src/tasks/tasks.service';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';

@Injectable()
export class TagsService {

  constructor(private prisma: PrismaService, private tasksService: TasksService) { }

  async create(data: CreateTagInput) {
    // try {
      const { taskId } = await this.prisma.tag.create({ data })
      const updatedTask = await this.tasksService.findOne(taskId)
      return updatedTask;
    // } catch (e) {
    //   CommonError.ServerError()
    // }
  }

  async getTagsByTaskId(taskId: number) {
    try {
      return await this.prisma.tag.findMany({
        where: {
          taskId
        }
      })
    } catch (e) {
      CommonError.ServerError()
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.tag.findFirst({
        where: {
          id
        }
      })
    } catch (e) {
      CommonError.ServerError()
    }
  }

  async update(id: number, data: UpdateTagInput) {
    try {
      const {taskId} = await this.prisma.tag.update({
        where: {
          id
        },
        data
      })
      const updatedTask = await this.tasksService.findOne(taskId)
      return updatedTask;
    } catch (e) {
      CommonError.ServerError()
    }
  }

  async remove(id: number) {
    try {
      const {taskId} = await this.prisma.tag.delete({
        where: {
          id
        }
      })
      const updatedTask = await this.tasksService.findOne(taskId)
      return updatedTask;
    } catch (e) {
      CommonError.ServerError()
    }
  }
}
