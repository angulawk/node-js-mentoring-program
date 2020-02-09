const Sequelize = require('sequelize');
import { sequelize } from "../data-access/db";

const User = sequelize.define('user', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  isDeleted: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
}, {});

export default User;