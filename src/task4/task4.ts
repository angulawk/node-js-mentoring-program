import express from "express";
import uuid from "uuid/v1";
import * as Joi from '@hapi/joi';
import {
  Response,
  Request,
  NextFunction
} from "express";
import {
  ValidatedRequest,
  ExpressJoiError
} from "express-joi-validation";
import {
  UserSchema,
  User,
  SchemaError,
  ErrorResponse
} from "./typings";

import getAutoSuggestUsers from "../utils/getAutoSuggestUsers.js";
import { updateUsers, getUsers } from "../utils/users.js";

const app = express();

app.listen(3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//validation
const errorResponse = (schemaErrors: SchemaError[]): ErrorResponse => {
  const errors: SchemaError[] = schemaErrors.map((error: SchemaError) => {
    let { path, message }: SchemaError = error;
    return { path, message };
  });

  return {
    status: "failed",
    errors
  }
}

const validateSchema = schema => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error }: { error: ExpressJoiError|any } = schema.validate(req.body, {
      allowUnknown: false,
      abortEarly: false,
      convert: true
    })

    error && error.isJoi ? (
      res.status(400).json(errorResponse(error.details))
    ) : next();
  }
}

const userSchema = Joi
  .object()
  .keys({
    id: Joi.string().required(),
    login: Joi.string().alphanum().min(6).max(16).required(),
    password: Joi.string().pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]$")).required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
  });

app.get("/users", (req: Request, res: Response, next: NextFunction) => {
  res.json(getUsers());
  next();
})

app.get("/user/:id", (req: Request, res: Response, next: NextFunction) => {
  const user: User = getUsers().find((user: User) => user.id === req.params.id);
  res.json(user);
  next();
});

app.post("/user", validateSchema(userSchema), (req: ValidatedRequest<UserSchema>, res: Response, next: NextFunction) => {
  const user: User = {
    id: uuid(),
    ...req.body
  };
  getUsers().push(user);

  res.json(getUsers());
  next();
});

app.put("/user/:id", validateSchema(userSchema), (req: ValidatedRequest<UserSchema>, res: Response, next: NextFunction) => {
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
