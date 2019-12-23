import express from "express";
import uuid from "uuid/v1";
import {
  Response,
  Request,
  NextFunction
} from "express";
import {
  User
} from "./typings";

import getAutoSuggestUsers from "../utils/getAutoSuggestUsers.js";
import { updateUsers, getUsers } from "../utils/users.js";

const app = express();

app.listen(3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", (req: Request, res: Response, next: NextFunction) => {
  res.json(getUsers());
  next();
})

app.get("/user/:id", (req: Request, res: Response, next: NextFunction) => {
  const user: User = getUsers().find((user: User) => user.id === req.params.id);
  res.json(user);
  next();
});

app.post("/user", (req: Request, res: Response, next: NextFunction) => {
  const user: User = {
    id: uuid(),
    ...req.body
  };
  getUsers().push(user);

  res.json(getUsers());
  next();
});

app.put("/user/:id", (req: Request, res: Response, next: NextFunction) => {
  const updatedUsers: User[] = getUsers().map((user: User) => user.id === req.params.id ?
    { id: user.id,
      ...req.body
    } : user);
  updateUsers(updatedUsers);

  res.json(getUsers());
  next();
});

app.get("/auto-suggest/:loginSubstring", (req: Request, res: Response, next: NextFunction) => {
  const autoSuggestUsers: User[] = getAutoSuggestUsers(req.params.loginSubstring, req.query.limit);

  res.json(autoSuggestUsers);
  next();
});

app.delete("/user/:id", (req: Request, res: Response, next: NextFunction) => {
  const updatedUsers: User[] = getUsers().map((user: User) => user.id === req.params.id ? {
    ...user,
    isDeleted: true
  } : user);
  updateUsers(updatedUsers);

  res.json(getUsers());
  next();
});