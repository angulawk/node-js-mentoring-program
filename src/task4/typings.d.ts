import {
  ValidatedRequestSchema,
  ContainerTypes
} from "express-joi-validation";

export type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export interface UserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: User
}

export interface SchemaError {
  path: string[];
  message: string;
}

export interface ErrorResponse {
  status: string;
  errors: SchemaError[];
}