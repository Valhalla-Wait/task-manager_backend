import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(private prisma:PrismaService){}

  async createUser(data: CreateUserInput) {
    return this.prisma.user.create({data})
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async getUserByEmail(email:string) {
    return this.prisma.user.findFirst({
      where: {
        email
      }
    });
  }

  async getUserById(id:number) {
    return this.prisma.user.findFirst({
      where: {
        id
      }
    });
  }

  async getUserByActivationLink(activationLink:string) {
    return this.prisma.user.findFirst({
      where: {
        activationLink
      }
    });
  }

  async activateUserById(id:number) {
      const update = await this.prisma.user.update({
        where:{
          id
        },
        data: {
          isActivated: true
        }
      })
      return update
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
