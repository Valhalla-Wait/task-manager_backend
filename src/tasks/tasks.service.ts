import { Injectable } from '@nestjs/common';
import { LightTask, LightTasksOnExecutors, Prisma, Task, TasksOnExecutors, User } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';
import { CommonError } from 'src/exceptions/common.error';
import { CreateLightTaskInput, CreateTaskInput } from './dto/create-task.input';
import { UpdateLightTaskInput, UpdateTaskInput } from './dto/update-task.input';
import { CreatedTaskData } from './entities/createdTaskData.entity';
import { TaskData } from './entities/taskData.entity';


@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) { }

  private prepareTaskData(task: Task & {
    executors: (TasksOnExecutors & {
      executor: User;
    })[];
  }) {
    return ({
      ...task,
      executors: [
        ...task.executors.map(e => ({
          ...e.executor
        }))
      ]
    })
  }

  private prepareLightTaskData(task: LightTask & {
    executor: (LightTasksOnExecutors & {
      executor: User;
    })[];
    status: {
      name: string;
    };
  }) {
    return ({
      ...task,
      executor: [
        ...task.executor.map(e => ({
          ...e.executor
        }))
      ],
      status: task.status.name
    })
  }

  private prepareLightTasksData(tasks: (LightTask & {
    executor: (LightTasksOnExecutors & {
      executor: User;
    })[];
    status: {
      name: string;
    };
  })[]) {
    return tasks.map(task => ({
      ...task,
      executor: [
        ...task.executor.map(e => ({
          ...e.executor
        }))
      ],
      status: task.status.name
    }))
  }

  private prepareTasksData(tasks: (Task & {
    executors: (TasksOnExecutors & {
      executor: User;
    })[];
  })[]) {
    return tasks.map(t => ({
      ...t,
      executors: [
        ...t.executors.map(e => ({
          ...e.executor
        }))
      ]
    }))
  }

  async createLightTask({ executorIds, ...data }: CreateLightTaskInput) {
    const executorsData = []
    if (executorIds.length) {
      for (let i = 0; i < executorIds.length; i++) {
        executorsData.push({
          executor: {
            connect: {
              id: executorIds[i]
            }
          }
        })
      }
    }
    const createdTask = await this.prisma.lightTask.create({
      data: {
        ...data,
        executor: {
          create: executorsData
        },

      },
      include: {
        executor: {
          include: {
            executor: true
          }
        },
        status: {
          select: {
            name: true
          }
        }
      }
    })
    const prepareData = this.prepareLightTaskData(createdTask)
    return prepareData
  }

  async create({ executorIds, tagIds, ...data }: CreateTaskInput) {
    try {
      const executorsData = []
      const tagsData = []

      if (executorIds.length) {
        for (let i = 0; i < executorIds.length; i++) {
          executorsData.push({
            executor: {
              connect: {
                id: executorIds[i]
              }
            }
          })
        }
      }

      if (tagIds.length) {
        for (let i = 0; i < tagIds.length; i++) {
          tagsData.push({
            tag: {
              connect: {
                id: tagIds[i]
              }
            }
          })
        }
      }

      const createdTask = await this.prisma.task.create({
        data: {
          ...data,
          executors: {
            create: executorsData
          },
          tags: {
            create: tagsData
          }
        },
        include: {
          executors: {
            include: {
              executor: true
            }
          },
          tags: {
            select: {
              id: true,
              name: true,
              color: true,
            }
          },
        }
      });

      const prepareTaskData = this.prepareTaskData(createdTask)
      return prepareTaskData
    } catch (e) {
      console.log(e)
      CommonError.ServerError()
    }
  }

  async getTasksByProjectId(projectId: number) {
    try {
      const tasks = await this.prisma.task.findMany({
        where: {
          projectId
        },
        include: {
          executors: {
            include: {
              executor: true
            }
          },
          tags: {
            select: {
              id: true,
              name: true,
              color: true,
            }
          },
        }
      });

      const prepareTasksData = this.prepareTasksData(tasks)
      return prepareTasksData
    } catch (e) {
      CommonError.ServerError()
    }
  }

  async getLightTasksByProjectId(projectId: number) {
    try {
      const tasks = await this.prisma.lightTask.findMany({
        where: {
          projectId
        },
        include: {
          executor: {
            include: {
              executor: true
            }
          },
          status: {
            select: {
              name: true
            }
          }
        }
      });

      const prepareTasksData = this.prepareLightTasksData(tasks)
      return prepareTasksData
    } catch (e) {
      CommonError.ServerError()
    }
  }

  async findOne(id: number) {
    try {
      const task = await this.prisma.task.findFirst({
        where: {
          id
        },
        include: {
          executors: {
            include: {
              executor: true
            }
          },
          tags: {
            select: {
              id: true,
              name: true,
              color: true,
            }
          },
        }
      });

      const prepareTaskData = this.prepareTaskData(task)
      return prepareTaskData
    } catch (e) {
      CommonError.ServerError()
    }
  }

  async update(id: number, data: UpdateTaskInput) {
    try {
      const updatedTask = await this.prisma.task.update({
        where: {
          id
        },
        data,
        include: {
          executors: {
            include: {
              executor: true
            }
          },
          tags: {
            select: {
              id: true,
              name: true,
              color: true,
            }
          },
        }
      });

      const prepareTaskData = this.prepareTaskData(updatedTask)
      return prepareTaskData
    } catch (e) {
      CommonError.ServerError()
    }
  }

  async updateLightTask(id: number, data: UpdateLightTaskInput) {
    try {
      const updatedTask = await this.prisma.lightTask.update({
        where: {
          id
        },
        data,
        include: {
          executor: {
            include: {
              executor: true
            }
          },
          status:{
            select:{
              name:true
            }
          }
        }
      });

      const prepareTaskData = this.prepareLightTaskData(updatedTask)
      return prepareTaskData
    } catch (e) {
      CommonError.ServerError()
    }
  }

  async removeLightTask(id: number) {
    try {
      const removedTask = await this.prisma.lightTask.delete({
        where: {
          id
        },
        include: {
          executor: {
            include: {
              executor: true
            }
          },
          status:{
            select:{
              name:true
            }
          }
        }
      });

      const prepareTaskData = this.prepareLightTaskData(removedTask)
      return prepareTaskData
    } catch (e) {
      CommonError.ServerError()
    }
  }

  async remove(id: number) {
    try {
      const removedTask = await this.prisma.task.delete({
        where: {
          id
        },
        include: {
          executors: {
            include: {
              executor: true
            }
          },
          tags: {
            select: {
              id: true,
              name: true,
              color: true,
            }
          },
        }
      });

      const prepareTaskData = this.prepareTaskData(removedTask)
      return prepareTaskData
    } catch (e) {
      CommonError.ServerError()
    }
  }
}
