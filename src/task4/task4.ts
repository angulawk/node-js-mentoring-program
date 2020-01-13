import express from "express";
import * as Joi from '@hapi/joi';
import {
  Response,
  Request,
  NextFunction
} from "express";
import {
  ExpressJoiError
} from "express-joi-validation";
import {
  SchemaError,
  ErrorResponse
} from "./typings";

import {
  getUsers,
  getUser,
  addUser,
  updateUser,
  getAutoSuggestList,
  deleteUser
} from "../utils/users.js";

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
    const { body }: Request = req.body;
    const { error }: { error: ExpressJoiError|any } = schema.validate(body, {
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
    password: Joi.string().regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/i, "Password must contain numbers and letters").required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
  });

app.get("/users", getUsers);

app.get("/user/:id", getUser);

app.post("/user", validateSchema(userSchema), addUser);

app.put("/user/:id", validateSchema(userSchema), updateUser);

app.get("/auto-suggest/:loginSubstring", getAutoSuggestList);

app.delete("/user/:id", deleteUser);
