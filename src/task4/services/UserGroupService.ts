import UserGroups from "../models/UserGroups";
import { UserGroupType } from "../typings";
import uuid from "uuid/v1";

export default class UserGroupService {
  async GetUsersGroups(): Promise<UserGroupType[]> {
    const usersGroups: UserGroupType[] = await UserGroups.findAll();

    return usersGroups;
  }

  async AddUsersToGroup({ groupId, userIds }): Promise<UserGroupType[]> {
    const usersGroups = [];
    for(const userId of userIds) {
      const usersGroup = await UserGroups.create({ id: uuid(), groupId, userId });
      usersGroups.push(usersGroup)
    }

    return usersGroups;
  }
}