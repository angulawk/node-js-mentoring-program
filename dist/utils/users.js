"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v1_1 = __importDefault(require("uuid/v1"));
const getAutoSuggestUsers_js_1 = __importDefault(require("../utils/getAutoSuggestUsers.js"));
exports.users = [
    {
        id: v1_1.default(),
        login: "spiderman",
        password: "543545c45c3cc3",
        age: 25,
        isDeleted: false
    },
    {
        id: v1_1.default(),
        login: "batman",
        password: "fdgt5gre543g",
        age: 30,
        isDeleted: false
    },
    {
        id: v1_1.default(),
        login: "joker",
        password: "g4g5g4g45fsfd",
        age: 40,
        isDeleted: false
    },
    {
        id: v1_1.default(),
        login: "flash",
        password: "fdgt5gre543g",
        age: 30,
        isDeleted: false
    }
];
// export const updateUsers: User[]|any = updatedUsers => users = updatedUsers;
// export const getUsers: User[]|any = () => users;
exports.getUsers = (req, res, next) => {
    res.json(exports.users);
    next();
};
exports.getUserById = paramsId => {
    const user = exports.users.find((user) => user.id === paramsId);
    return user;
};
exports.updateUserById = (paramsId, body) => {
    const updatedUser = Object.assign(Object.assign({}, exports.getUserById(paramsId)), body);
    const updatedUsers = exports.users.map((user) => user.id === paramsId ? updatedUser : user);
    exports.users = updatedUsers;
    return updatedUser;
};
exports.addUserWithId = body => {
    const user = Object.assign({ id: v1_1.default() }, body);
    return user;
};
exports.getUser = (req, res, next) => {
    res.json(exports.getUserById(req.params.id));
    next();
};
exports.addUser = (req, res, next) => {
    const newUser = exports.addUserWithId(req.body);
    exports.users.push(newUser);
    res.json(newUser);
    next();
};
exports.updateUser = (req, res, next) => {
    const updatedUser = exports.updateUserById(req.params.id, req.body);
    res.json(updatedUser);
    next();
};
exports.getAutoSuggestList = (req, res, next) => {
    const autoSuggestUsers = getAutoSuggestUsers_js_1.default(req.params.loginSubstring, req.query.limit);
    res.json(autoSuggestUsers);
    next();
};
exports.deleteUser = (req, res, next) => {
    const deletedUser = exports.updateUserById(req.params.id, { isDeleted: true });
    res.json(deletedUser);
    next();
};
exports.default = exports.users;
//# sourceMappingURL=users.js.map