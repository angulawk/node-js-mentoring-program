"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const v1_1 = __importDefault(require("uuid/v1"));
const getAutoSuggestUsers_js_1 = __importDefault(require("../utils/getAutoSuggestUsers.js"));
const users_js_1 = require("../utils/users.js");
const app = express_1.default();
app.listen(3000);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/users", (req, res, next) => {
    res.json(users_js_1.getUsers());
    next();
});
app.get("/user/:id", (req, res, next) => {
    const user = users_js_1.getUsers().find((user) => user.id === req.params.id);
    res.json(user);
    next();
});
app.post("/user", (req, res, next) => {
    const user = Object.assign({ id: v1_1.default() }, req.body);
    users_js_1.getUsers().push(user);
    res.json(users_js_1.getUsers());
    next();
});
app.put("/user/:id", (req, res, next) => {
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