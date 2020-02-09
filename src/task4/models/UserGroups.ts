const Sequelize = require("sequelize");
import { sequelize } from "../data-access/db";

import User from "./Users";
import Group from "./Groups";

const UserGroup = sequelize.define("userGroup", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  }
}, {});

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });

export default UserGroup;