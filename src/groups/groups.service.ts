import { Injectable } from '@nestjs/common';
import { Group, GroupsOnUsers } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';
import { CommonError } from 'src/exceptions/common.error';
import { GroupError } from 'src/exceptions/group.error';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { prepareGroupResponse } from 'src/utils/prepareGroupResponse';
import { AddUserGroupInput } from './dto/add-user-group.input';
import { CreateGroupInput } from './dto/create-group.input';
import { DeleteMembersGroupInput } from './dto/delete-members-group.input';
import { RenameGroupInput } from './dto/rename-group.input';
import { GroupData } from './entities/groupData.entity';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService, private usersService: UsersService) { }

  private async getGroupLeadById(leadId: number) {
    return this.usersService.getUserById(leadId)
  }

  private async getGroupMembers(groupId: number) {
    const groupUsers: User[] = []
    const groupsOnUsers: GroupsOnUsers[] = await this.prisma.groupsOnUsers.findMany({
      where: {
        groupId: groupId
      }
    })

    for (let i = 0; i < groupsOnUsers.length; i++) {
      const userByRecord = await this.usersService.getUserById(groupsOnUsers[i].userId)

      groupUsers.push(userByRecord)
    }
    return groupUsers
  }

  private async makeCreateGroupQuery(data: CreateGroupInput) {
    if (data.membersIds.length) {
      const membersData = []

      for (let i = 0; i < data.membersIds.length; i++) {
        membersData.push({
          assignedBy: data.assignedBy,
          user: {
            connect: {
              id: data.membersIds[i]
            }
          }
        })
      }

      return this.prisma.group.create({
        data: {
          name: data.name,
          leadId: data.leadId,
          projectId: data.projectId,
          members: {
            create: membersData
          }
        }
      })
    } else {
      return this.prisma.group.create({
        data: {
          name: data.name,
          leadId: data.leadId,
          projectId: data.projectId,
        }
      })
    }
  }

  private async setLeadInGroup(groupId: number, userId: number, prevLeadId:number, assignedBy: string) {
    await this.prisma.group.update({
      where: {
        id: groupId
      },
      data: {
        lead: {
          connect: {
            id: userId
          }
        }
      }
    })
    return this.addMemberInGroup({groupId, userId: prevLeadId, assignedBy})
  }

  async createGroup(data: CreateGroupInput) {
    try {
      const createGroup = await this.makeCreateGroupQuery(data)
      return this.getGroupById(createGroup.id)
    } catch (e) {
      console.log(e)
      throw CommonError.ServerError()
    }

  }

  async renameGroup(data: RenameGroupInput) {
    try {
      return this.prisma.group.update({
        where: {
          id: data.groupId
        },
        data: {
          name: data.name
        }
      })
    } catch (e) {
      throw CommonError.ServerError()
    }

  }

  async addMemberInGroup(data: AddUserGroupInput) {
      const isMember = await this.prisma.groupsOnUsers.findFirst({
        where: {
          userId: data.userId,
          groupId: data.groupId
        }
      });

      if (isMember) {
        throw GroupError.MemberIsAlreadyExists()
      }

      const isLead = await this.prisma.group.findFirst({
        where: {
          leadId: data.userId,
          id: data.groupId
        }
      });

      if (isLead) {
        throw GroupError.LeadNotMustBeMember()
      }

      const addMember = await this.prisma.groupsOnUsers.create({
        data: {
          assignedBy: data.assignedBy,
          userId: data.userId,
          groupId: data.groupId
        }
      });

      return this.getGroupById(addMember.groupId)
  }

  async deleteMemberInGroup(data: DeleteMembersGroupInput) {
    try {
      const deleteMember = await this.prisma.groupsOnUsers.delete({
        where: {
          userId_groupId: {
            userId: data.userId,
            groupId: data.groupId
          }
        }
      });
      return this.getGroupById(deleteMember.groupId)
    } catch (e) {
      throw CommonError.ServerError()
    }
  }

  async addLeadInGroup({groupId, userId, assignedBy}: AddUserGroupInput) {
    const groupInfo = await this.prisma.group.findFirst({
      where: {
        id: groupId,
      },
    });
    if (groupInfo.leadId === userId) {
      throw GroupError.UserAlreadyLead()
    }

    const groupMembers = await this.getGroupMembers(groupId)
    const userIsMember = groupMembers.find(member => member.id === userId)
    if (userIsMember) {
      await this.deleteMemberInGroup({ groupId, userId })

      await this.setLeadInGroup(groupId, userId, groupInfo.leadId, assignedBy)

      return this.getGroupById(groupId)
    }
    await this.setLeadInGroup(groupId, userId, groupInfo.leadId, assignedBy) 
    return this.getGroupById(groupId)
  }

  async getGroupsByProjectId(projectId: number) {

    try {
      const projectGroups = await this.prisma.group.findMany({
        where: {
          projectId
        }
      })

      const projectGroupsData: GroupData[] = []

      for (let i = 0; i < projectGroups.length; i++) {
        const groupData = await this.getGroupById(projectGroups[i].id)
        projectGroupsData.push(groupData)
      }

      return projectGroupsData;
    } catch (e) {
      throw CommonError.ServerError()
    }
  }

  async getGroupById(groupId: number) {
      const groupInfo = await this.prisma.group.findFirst({
        where: {
          id: groupId,
        },
      });
      if (!groupInfo) {
        throw GroupError.GroupNotFound()
      }
      const groupLead = await this.getGroupLeadById(groupInfo.leadId)
      const groupMembers = await this.getGroupMembers(groupInfo.id)
      const groupData = prepareGroupResponse(groupInfo, groupLead, groupMembers)

      return groupData
  }


}
