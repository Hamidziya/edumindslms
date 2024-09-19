const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db').sequelize;
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  companyName: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin', 'manager', 'teacher', 'student'), allowNull: false },
  courseIds: {
    type: DataTypes.JSON, 
    defaultValue: [], 
  },
  isDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,  
  },
  isPermission: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,   
  },
});

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

module.exports = User;
