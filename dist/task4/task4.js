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
const v1_1 = __importDefault(require("uuid/v1"));
const Joi = __importStar(require("@hapi/joi"));
const getAutoSuggestUsers_js_1 = __importDefault(require("../utils/getAutoSuggestUsers.js"));
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
    console.log("schema", schema);
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
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
    password: Joi.string().pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]$")).required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
});
app.get("/users", (req, res, next) => {
    res.json(users_js_1.getUsers());
    next();
});
app.get("/user/:id", (req, res, next) => {
    const user = users_js_1.getUsers().find((user) => user.id === req.params.id);
    res.json(user);
    next();
});
app.post("/user", validateSchema(userSchema), (req, res, next) => {
    const user = Object.assign({ id: v1_1.default() }, req.body);
    users_js_1.getUsers().push(user);
    res.json(users_js_1.getUsers());
    next();
});
app.put("/user/:id", validateSchema(userSchema), (req, res, next) => {
    const updatedUsers = users_js_1.getUsers().map((user) => user.id === req.params.id ? Object.assign({ id: user.id }, req.body) : user);
    users_js_1.updateUsers(updatedUsers);
    res.json(users_js_1.getUsers());
    next();
});
app.get("/auto-suggest/:loginSubstring", (req, res, next) => {
    const autoSuggestUsers = getAutoSuggestUsers_js_1.default(req.params.loginSubstring, req.query.limit);
    res.json(autoSuggestUsers);
    next();
});
app.delete("/user/:id", (req, res, next) => {
    const updatedUsers = users_js_1.getUsers().map((user) => user.id === req.params.id ? Object.assign(Object.assign({}, user), { isDeleted: true }) : user);
    users_js_1.updateUsers(updatedUsers);
    res.json(users_js_1.getUsers());
    next();
});
//# sourceMappingURL=task4.js.map