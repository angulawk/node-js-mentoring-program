import uuid from "uuid/v1";
import {
  User
} from "../task4/typings";

let users: User[] = [
  {
    id: uuid(),
    login: "spiderman",
    password: "543545c45c3cc3",
    age: 25,
    isDeleted: false
  },
  {
    id: uuid(),
    login: "batman",
    password: "fdgt5gre543g",
    age: 30,
    isDeleted: false
  },
  {
    id: uuid(),
    login: "joker",
    password: "g4g5g4g45fsfd",
    age: 40,
    isDeleted: false
  },
  {
    id: uuid(),
    login: "flash",
    password: "fdgt5gre543g",
    age: 30,
    isDeleted: false
  }
];

export const updateUsers: User[]|any = updatedUsers => users = updatedUsers;
export const getUsers: User[]|any = () => users;

export default users;
