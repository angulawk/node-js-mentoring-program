import User from "../models/Users";
import { UserType } from "../typings";
import uuid from "uuid/v1";

export default class UserService {
  async GetUsers(): Promise<UserType[]> {
    const users: UserType[] = await User.findAll();
    return users;
  }

  async GetUser(id: string): Promise<UserType> {
    const user: UserType = await User.findOne({ where: { id } })
    return user;
  }

  async AddUser(body): Promise<UserType> {
    const newUser: UserType = await User.create({ id: uuid(), ...body });
    return newUser;
  }

  async UpdateUser({ body, id }): Promise<UserType> {
    await User.update({ ...body }, {
      where: { id }
    });
    const user: UserType = await User.findOne({ where: { id } });
    return user;
  }

  GetAutoSuggestUsers(users: UserType[], loginSubstring: string, limit: number): UserType[] {
    const filteredArray: UserType[] = users.filter((item: UserType) => item.login.includes(loginSubstring));
    filteredArray
      .sort(( a: UserType, b: UserType ) => {
        return (a.login > b.login) ? 1 : ((b.login > a.login) ? -1 : 0)
      })
      .slice(0, limit);
    return filteredArray;
  }

  async GetAutoSuggestList({ loginSubstring, limit }): Promise<UserType[]> {
    const users: UserType[] = await User.findAll();
    const suggestedUsers: UserType[] = this.GetAutoSuggestUsers(users, loginSubstring, limit);
    return suggestedUsers;
  }

  async DeleteUser(id: string): Promise<UserType> {
    await User.update({ isDeleted: true }, {
      where: { id }
    });
    const user: UserType = await User.findOne({ where: { id } })
    return user;
  }
}