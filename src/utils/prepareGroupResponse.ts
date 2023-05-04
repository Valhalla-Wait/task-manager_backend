import { Group } from "src/groups/entities/group.entity"
import { GroupData } from "src/groups/entities/groupData.entity"
import { User } from "src/users/entities/user.entity"

export const prepareGroupResponse = (groupInfo: Group, groupLead: User, groupMembers: User[]): GroupData => {
    return {
      id: groupInfo.id,
      projectId: groupInfo.projectId,
      name: groupInfo.name,
      lead: groupLead,
      members: groupMembers
    }
  }