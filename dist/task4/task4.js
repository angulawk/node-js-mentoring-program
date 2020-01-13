"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Joi = __importStar(require("@hapi/joi"));
const users_js_1 = require("../utils/users.js");
const app = express_1.default();
app.listen(3000);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//validation
const errorResponse = (schemaErrors) => {
    const errors = schemaErrors.map((error) => {
        let { path, message } = error;
        return { path, message };
    });
    return {
        status: "failed",
        errors
    };
};
const validateSchema = schema => {
    return (req, res, next) => {
        const { body } = req.body;
        const { error } = schema.validate(body, {
            allowUnknown: false,
            abortEarly: false,
            convert: true
        });
        error && error.isJoi ? (res.status(400).json(errorResponse(error.details))) : next();
    };
};
const userSchema = Joi
    .object()
    .keys({
    id: Joi.string().required(),
    login: Joi.string().alphanum().min(6).max(16).required(),
    password: Joi.string().regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/i, "Password must contain numbers and letters").required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
});
// app.get("/users", (req: Request, res: Response, next: NextFunction) => {
//   res.json(getUsers());
//   next();
// })
app.get("/users", users_js_1.getUsers);
// app.get("/user/:id", (req: Request, res: Response, next: NextFunction) => {
//   const user: User = getUsers().find((user: User) => user.id === req.params.id);
//   res.json(user);
//   next();
// });
app.get("/user/:id", users_js_1.getUser);
// app.post("/user", validateSchema(userSchema), (req: ValidatedRequest<UserSchema>, res: Response, next: NextFunction) => {
//   const user: User = {
//     id: uuid(),
//     ...req.body
//   };
//   getUsers().push(user);
//   res.json(getUsers());
//   next();
// });
app.post("/user", validateSchema(userSchema), users_js_1.addUser);
// app.put("/user/:id", validateSchema(userSchema), (req: ValidatedRequest<UserSchema>, res: Response, next: NextFunction) => {
//   const updatedUsers: User[] = getUsers().map((user: User) => user.id === req.params.id ?
//     { id: user.id,
//       ...req.body
//     } : user);
//   updateUsers(updatedUsers);
//   res.json(getUsers());
//   next();
// });
app.put("/user/:id", validateSchema(userSchema), users_js_1.updateUser);
// app.get("/auto-suggest/:loginSubstring", (req: Request, res: Response, next: NextFunction) => {
//   const autoSuggestUsers: User[] = getAutoSuggestUsers(req.params.loginSubstring, req.query.limit);
//   res.json(autoSuggestUsers);
//   next();
// });
app.get("/auto-suggest/:loginSubstring", users_js_1.getAutoSuggestList);
// app.delete("/user/:id", (req: Request, res: Response, next: NextFunction) => {
//   const updatedUsers: User[] = getUsers().map((user: User) => user.id === req.params.id ? {
//     ...user,
//     isDeleted: true
//   } : user);
//   updateUsers(updatedUsers);
//   res.json(getUsers());
//   next();
// });
app.delete("/user/:id", users_js_1.deleteUser);
//# sourceMappingURL=task4.js.map