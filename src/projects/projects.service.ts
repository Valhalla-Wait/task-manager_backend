import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { ProjectError } from 'src/exceptions/project.error';
import { CreateProjectInput } from './dto/create-project.input';
import { GetProjectsInput } from './dto/get-projects.input';

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

  // async getUser(data: LoginInput) {
  //   return ;;
  // }

  // async updateUser(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  // async deleteUser(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
