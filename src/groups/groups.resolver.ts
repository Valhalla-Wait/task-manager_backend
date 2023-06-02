import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddUserGroupInput } from './dto/add-user-group.input';
import { CreateGroupInput } from './dto/create-group.input';
import { DeleteMembersGroupInput } from './dto/delete-members-group.input';
import { RenameGroupInput } from './dto/rename-group.input';
import { Group } from './entities/group.entity';
import { GroupData } from './entities/groupData.entity';
import { GroupsService } from './groups.service';

@Resolver(() => Group)
@UseGuards(AuthGuard)
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @Mutation(() => GroupData)
  createGroup(@Args('createGroupInput') createGroupInput: CreateGroupInput) {
    //Имя добавившего взять из токена!
    return this.groupsService.createGroup(createGroupInput);
  }

  @Mutation(() => Group)
  renameGroup(@Args('renameGroupInput') renameGroupInput: RenameGroupInput) {
    return this.groupsService.renameGroup(renameGroupInput);
  }

  @Mutation(() => GroupData)
  addMembersInGroup(@Args('addMembersGroupInput') addUserGroupInput: AddUserGroupInput) {
    return this.groupsService.addMemberInGroup(addUserGroupInput);
  }

  @Mutation(() => GroupData)
  deleteMembersInGroup(@Args('deleteMembersGroupInput') deleteMembersGroupInput: DeleteMembersGroupInput) {
    return this.groupsService.deleteMemberInGroup(deleteMembersGroupInput);
  }

  @Mutation(() => GroupData)
  addLeadInGroup(@Args('addLeadInGroup') addUserGroupInput: AddUserGroupInput) {
    return this.groupsService.addLeadInGroup(addUserGroupInput);
  }

  @Query(() => [GroupData], { name: 'groupsByProjectId' })
  getGroupsByProjectId(@Args('projectId') projectId: number) {
    return this.groupsService.getGroupsByProjectId(projectId);
  }

  @Query(() => GroupData, { name: 'groupById' })
  getGroupById(@Args('groupId') groupId: number) {
    return this.groupsService.getGroupById(groupId);
  }

}