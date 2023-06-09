import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { GroupsService } from 'src/groups/groups.service';
import { GroupData } from 'src/groups/entities/groupData.entity';
import { Status } from 'src/statuses/entities/status.entity';
import { getPercent } from 'src/utils/getPercent';
import { TasksAnalyticByStatus } from './entities/tasksAnalyticByStatus.entity';
import { TasksAnalyticByGroups } from './entities/tasksAnalyticByGroups.entity';
import { TasksAnalyticByUsers } from './entities/tasksAnalyticByUsers.entity';


@Injectable()
export class ProjectAnalyticsService {

  constructor(private prisma: PrismaService, private groupsService: GroupsService) { }

  private makeTasksAnalyticByStatus(tasksCountByCurrentStatus: number, status: string, allTasksCount: number): TasksAnalyticByStatus {
    return ({
      tasksStatus: status,
      percent: getPercent(tasksCountByCurrentStatus, allTasksCount),
      tasksCount: tasksCountByCurrentStatus
    })
  }

  private async makeProjectAnalytic(statuses: Status[], allTasksCount: number, projectId: number) {
    const projectAnalytic: TasksAnalyticByStatus[] = []
    for (let i = 0; i < statuses.length; i++) {
      const tasksCount = await this.prisma.task.count({
        where: {
          projectId,
          statusId: statuses[i].id
        }
      })
      projectAnalytic.push(this.makeTasksAnalyticByStatus(tasksCount, statuses[i].name, allTasksCount))
    }
    return projectAnalytic
  }

  private async makeGroupsAnalytic(statuses: Status[], groups: GroupData[], projectId: number) {
    const groupsAnalytic: TasksAnalyticByGroups[] = []
    for (let i = 0; i < groups.length; i++) {
      const groupAnalytic = await this.getAnalyticbyGroupId(projectId, groups[i].id, statuses, groups)
      groupsAnalytic.push(groupAnalytic)
    }
    return groupsAnalytic
  }


  async getAnalytic(projectId: number) {
    const statuses = await this.prisma.status.findMany()
    const allTasksCount = await this.prisma.task.count({
      where: {
        projectId
      }
    })

    const analytic = await this.makeProjectAnalytic(statuses, allTasksCount, projectId)
    return analytic;
  }

  async getAnalyticbyGroups(projectId: number) {

    const statuses = await this.prisma.status.findMany()
    const groups = await this.groupsService.getGroupsByProjectId(projectId)

    const analytic = await this.makeGroupsAnalytic(statuses, groups, projectId)

    return analytic
  }

  async getAnalyticbyGroupId(projectId: number, groupId: number, statuses?: Status[], groups?: GroupData[]) {
    if (!statuses) {
      statuses = await this.prisma.status.findMany()
    }

    if (!groups) {
      groups = await this.groupsService.getGroupsByProjectId(projectId)
    }

    const { name } = groups.find(group => group.id === groupId && group.projectId === projectId)

    const groupAnalyticData: TasksAnalyticByGroups = {
      id: groupId,
      name,
      analytic: []
    }

    const tasksCountInGroup = await this.prisma.task.count({
      where: {
        projectId,
        groupId
      }
    })

    const analytic: TasksAnalyticByStatus[] = []

    for (let i = 0; i < statuses.length; i++) {

      const taskCountByStatusInGroup = await this.prisma.task.count({
        where: {
          projectId,
          groupId,
          statusId: statuses[i].id
        }
      })
      analytic.push(this.makeTasksAnalyticByStatus(taskCountByStatusInGroup, statuses[i].name, tasksCountInGroup))

    }

    groupAnalyticData.analytic = analytic

    return groupAnalyticData
  }

  async getAnalyticGroupByUsers(projectId: number, groupId: number) {
    const statuses = await this.prisma.status.findMany()
    const usersAnalyticData: TasksAnalyticByUsers[] = []

    const groupUsers = await this.prisma.user.findMany({
      where: {
        groups: {
          some: {
            groupId: groupId
          }
        }
      },
    })

    for (let i = 0; i < groupUsers.length; i++) {
      const userAnalytic: TasksAnalyticByStatus[] = []

      for (let j = 0; j < statuses.length; j++) {

        const taskCountInGroup = await this.prisma.task.count({
          where: {
            groupId,
          }
        })
        const userTaskCountByStatus = await this.prisma.task.count({
          where: {
            projectId,
            statusId: statuses[j].id,
            groupId,
            executors: {
              some: {
                executorId: groupUsers[i].id
              }
            }
          }
        })
        
        userAnalytic.push(this.makeTasksAnalyticByStatus(userTaskCountByStatus, statuses[j].name, taskCountInGroup))
      }


      usersAnalyticData.push({
        id: groupUsers[i].id,
        firstName: groupUsers[i].firstName,
        lastName: groupUsers[i].lastName,
        analytic: userAnalytic,
      })
    }

    return usersAnalyticData
  }

  async getAnalyticByUsers(projectId: number) {
    const statuses = await this.prisma.status.findMany()
    const usersAnalyticData: TasksAnalyticByUsers[] = []

    const projectUsers = await this.prisma.user.findMany({
      where: {
        projects: {
          some: {
            id: projectId
          }
        }
      },
    })

    for (let i = 0; i < projectUsers.length; i++) {
      const userAnalytic: TasksAnalyticByStatus[] = []

      for (let j = 0; j < statuses.length; j++) {

        const taskCountInProject = await this.prisma.task.count({
          where: {
            projectId,
          }
        })
        const userTaskCountByStatus = await this.prisma.task.count({
          where: {
            projectId,
            statusId: statuses[j].id,
            executors: {
              some: {
                executorId: projectUsers[i].id
              }
            }
          }
        })
        
        userAnalytic.push(this.makeTasksAnalyticByStatus(userTaskCountByStatus, statuses[j].name, taskCountInProject))
      }


      usersAnalyticData.push({
        id: projectUsers[i].id,
        firstName: projectUsers[i].firstName,
        lastName: projectUsers[i].lastName,
        analytic: userAnalytic,
      })
    }

    return usersAnalyticData
  }
}
