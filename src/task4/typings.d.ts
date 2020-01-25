import {
  ValidatedRequestSchema,
  ContainerTypes
} from "express-joi-validation";

export type UserType = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export interface UserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: UserType
}

export interface SchemaError {
  path: string[];
  message: string;
}

export interface ErrorResponse {
  status: string;
  errors: SchemaError[];
}
