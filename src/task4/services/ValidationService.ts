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
} from "../typings";

export default class ValidationService {
  ErrorResponse(schemaErrors: SchemaError[]): ErrorResponse {
    const errors: SchemaError[] = schemaErrors.map((error: SchemaError) => {
      let { path, message }: SchemaError = error;
      return { path, message };
    });

    return {
      status: "failed",
      errors
    }
  }

  UserSchema = Joi
    .object()
    .keys({
      id: Joi.string().required(),
      login: Joi.string().alphanum().min(6).max(16).required(),
      password: Joi.string().regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/i, "Password must contain numbers and letters").required(),
      age: Joi.number().min(4).max(130).required(),
      isDeleted: Joi.boolean().required()
    });

  ValidateSchema() {
    return (req: Request, res: Response, next: NextFunction) => {
      const { body }: Request = req.body;
      const { error }: { error: ExpressJoiError|any } = this.UserSchema.validate(body, {
        allowUnknown: false,
        abortEarly: false,
        convert: true
      })

      error && error.isJoi ? (
        res.status(400).json(this.ErrorResponse(error.details))
      ) : next();
    }
  }
}