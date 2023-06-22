import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { ProjectError } from 'src/exceptions/project.error';
import { AddMembersInput } from './dto/add-members-project.input copy';
import { CreateProjectInput } from './dto/create-project.input';
import { DeleteMembersInput } from './dto/delete-members-project.input';
import { GetProjectsInput } from './dto/get-projects.input';
import { UpdateProjectInput } from './dto/update-project.input';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) { }

  async createProject(data: CreateProjectInput) {
    return this.prisma.project.create({ data });
  }

  async getProjectsByOwnerId({ ownerId }: GetProjectsInput) {
    return this.prisma.project.findMany({
      where: {
        ownerId
      }
    });
  }

  async addMemberInProject({ projectId, memberId }: AddMembersInput) {
    return this.prisma.projectsOnUsers.create({
      data: {
        assignedBy: 'Owner',
        projectId,
        userId: memberId,
      },
    });
  }

  async deleteMemberInProject({ projectId, memberId }: DeleteMembersInput) {
    return this.prisma.projectsOnUsers.delete({
      where:{
        userId_projectId: {
          userId: memberId,
          projectId
        }
      }
      // data: {
      //   assignedBy: 'Owner',
      //   projectId,
      //   userId: memberId,
      // },
    });
  }

  async getProjectById(projectId: number) {
    const projectUsers = await this.prisma.user.findMany({
      where: {
        projects: {
          some:{
            projectId
          }
        }
      }
    })

    const projectTasks = await this.prisma.task.findMany({
      where: {
        projectId
      }
    })

    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
      },
    });
    if (!project) {
      throw ProjectError.ProjectNotFound()
    }
    return ({...project, members: projectUsers, tasks: projectTasks})
  }

  async deleteProject(projectId: number) {
    return this.prisma.project.delete({
      where: {
        id: projectId
      }
    })
  }

  async updateProject({ id, name, description }: UpdateProjectInput) {
    return this.prisma.project.update({
      where: {
        id
      },
      data: {
        name,
        description
      }
    })
  }

}
