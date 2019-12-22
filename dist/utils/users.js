"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v1_1 = __importDefault(require("uuid/v1"));
let users = [
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
exports.updateUsers = updatedUsers => users = updatedUsers;
exports.getUsers = () => users;
exports.default = users;
//# sourceMappingURL=users.js.map