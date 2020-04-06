import Group from "../models/Groups";
import { GroupType } from "../typings";
import uuid from "uuid/v1";

export default class GroupService {
  async GetGroups(): Promise<GroupType[]> {
    const groups: GroupType[] = await Group.findAll();

    return groups;
  }

  async GetGroup(id: string): Promise<GroupType> {
    const group: GroupType = await Group.findOne({ where: { id } })
    return group;
  }

  async AddGroup(body): Promise<GroupType> {
    const newGroup: GroupType = await Group.create({ id: uuid(), ...body });
    return newGroup;
  }

  async UpdateGroup({ body, id }): Promise<GroupType> {
    await Group.update({ ...body }, {
      where: { id }
    });
    const group: GroupType = await Group.findOne({ where: { id } });
    return group;
  }

  async DeleteGroup(id: string): Promise<boolean> {
    const group: boolean = await Group.destroy({ where: { id } });

    return group;
  }
}