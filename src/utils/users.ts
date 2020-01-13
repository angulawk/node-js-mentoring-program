import uuid from "uuid/v1";
import {
  User,
  UpdatedUser,
  UserSchema
} from "../task4/typings";
import {
  ValidatedRequest
} from "express-joi-validation";
import {
  Response,
  Request,
  NextFunction
} from "express";
import getAutoSuggestUsers from "../utils/getAutoSuggestUsers.js";

export let users: User[] = [
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

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  res.json(users);
  next();
}

export const getUserById = paramsId => {
  const user = users.find((user: User) => user.id === paramsId);

  return user;
}

export const updateUserById = (paramsId: String, body: UpdatedUser ) => {
  const updatedUser = {
    ...getUserById(paramsId),
    ...body
  }
  const updatedUsers: User[] = users.map((user: User) =>
    user.id === paramsId ? updatedUser : user);

  users = updatedUsers;

  return updatedUser;
}

export const addUserWithId = (body: User) => {
  const user: User = {
    id: uuid(),
    ...body
  };
  return user;
}

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  res.json(getUserById(req.params.id));
  next();
}

export const addUser = (req: ValidatedRequest<UserSchema>, res: Response, next: NextFunction) => {
  const newUser: User = addUserWithId(req.body);
  users.push(newUser);

  res.json(newUser);
  next();
}

export const updateUser = (req: ValidatedRequest<UserSchema>, res: Response, next: NextFunction) => {
  const updatedUser: User = updateUserById(req.params.id, req.body);

  res.json(updatedUser);
  next();
}

export const getAutoSuggestList = (req: Request, res: Response, next: NextFunction) => {
  const suggestedUsers: User[] = getAutoSuggestUsers(req.params.loginSubstring, req.query.limit);

  res.json(suggestedUsers);
  next();
}

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const deletedUser: User = updateUserById(req.params.id, { isDeleted: true });

  res.json(deletedUser);
  next();
}

export default users;
