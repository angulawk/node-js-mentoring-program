const Sequelize = require('sequelize');
import { sequelize } from "../data-access/db";

const Group = sequelize.define('group', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  permissions: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  }
}, {});

export default Group;