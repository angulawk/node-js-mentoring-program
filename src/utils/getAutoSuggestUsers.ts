import { users } from "./users";
import {
  User
} from "../task4/typings";

const getAutoSuggestUsers = (loginSubstring: string, limit: number): User[] => {
  const filteredArray: User[] = users.filter((item: User) => item.login.includes(loginSubstring));
  filteredArray
    .sort(( a: User, b: User ) => {
      return (a.login > b.login) ? 1 : ((b.login > a.login) ? -1 : 0)
    })
    .slice(0, limit);
  return filteredArray;
}

export default getAutoSuggestUsers;
