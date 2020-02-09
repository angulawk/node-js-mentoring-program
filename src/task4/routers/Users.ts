
import {
  UserType,
  UserSchema
} from "../typings";
import {
  ValidatedRequest
} from "express-joi-validation";
import {
  Response,
  Request,
  NextFunction
} from "express";
import UserService from "../services/UserService";

const userService = new UserService();

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const users: UserType[] = await userService.GetUsers();
  res.json(users);
  next();
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: UserType = await userService.GetUser(req.params.id);
    
    res.json(user);
    next();
  } catch(err) {
    next(err);
  }
}

export const addUser = async (req: ValidatedRequest<UserSchema>, res: Response, next: NextFunction) => {
  try {
    const newUser: UserType = await userService.AddUser(req.body);

    res.json(newUser);
    next();
  } catch(err) {
    next(err);
  }
}

export const updateUser = async (req: ValidatedRequest<UserSchema>, res: Response, next: NextFunction) => {
  try {
    const user: UserType = await userService.UpdateUser({ body: req.body, id: req.params.id })
    
    res.json(user);
    next();
  } catch(err) {
    next(err);
  }
}

export const getAutoSuggestList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { loginSubstring, limit } = req.params;
    const suggestedUsers: UserType[] = await userService.GetAutoSuggestList({ loginSubstring, limit });

    res.json(suggestedUsers);
    next();
  } catch(err) {
    next(err);
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {  
    const user: UserType = await userService.DeleteUser(req.params.id);

    res.json(user);
    next();
  } catch(err) {
    next(err);
  }
}
