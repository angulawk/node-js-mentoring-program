import { getUsers } from "./users";
import {
  User
} from "../task4/typings";

const getAutoSuggestUsers: User[]|any = (loginSubstring: string, limit: number) => {
  const filteredArray: User[] = getUsers().filter((item: User) => item.login.includes(loginSubstring));
  filteredArray
    .sort(( a: User, b: User ) => {
      return (a.login > b.login) ? 1 : ((b.login > a.login) ? -1 : 0)
    })
    .splice(limit, filteredArray.length - 1);
  return filteredArray;
}

export default getAutoSuggestUsers;