import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { ProjectError } from 'src/exceptions/project.error';
import { CreateProjectInput } from './dto/create-project.input';
import { GetProjectsInput } from './dto/get-projects.input';
import { UpdateProjectInput } from './dto/update-project.input';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async createProject(data: CreateProjectInput) {
    return this.prisma.project.create({ data });
  }

  async getProjectsByOwnerId({ownerId}: GetProjectsInput) {
    return this.prisma.project.findMany({
      where:{
        ownerId
      }
    });
  }

  async getProjectById(projectId: number) {
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
      },
    });
    if(!project) {
      throw ProjectError.ProjectNotFound()
    }
    return project
  }

 async deleteProject(projectId:number) {
    return this.prisma.project.delete({
      where:{
        id: projectId
      }
    })
 }

 async updateProject({id, name, description}: UpdateProjectInput) {
  return this.prisma.project.update({
    where:{
      id
    },
    data:{
      name,
      description
    }
  })
 }

}