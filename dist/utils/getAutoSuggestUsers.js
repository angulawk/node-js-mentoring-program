"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("./users");
const getAutoSuggestUsers = (loginSubstring, limit) => {
    const filteredArray = users_1.getUsers().filter((item) => item.login.includes(loginSubstring));
    filteredArray
        .sort((a, b) => {
        return (a.login > b.login) ? 1 : ((b.login > a.login) ? -1 : 0);
    })
        .splice(limit, filteredArray.length - 1);
    return filteredArray;
};
exports.default = getAutoSuggestUsers;
//# sourceMappingURL=getAutoSuggestUsers.js.map