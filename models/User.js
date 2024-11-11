const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db").sequelize;
const bcrypt = require("bcryptjs");

const User = sequelize.define(
  "users",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    companyName: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
    state: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    isRegistration: { type: DataTypes.BOOLEAN, defaultValue: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM("admin", "manager", "teacher", "student"),
    },
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
  },
  {
    tableName: "users",
    freezeTableName: true,
  }
);

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

module.exports = User;
