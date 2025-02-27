const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db").sequelize;

const comments = sequelize.define(
  "comments",
  {
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    title: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
  },
  {
    tableName: "comments",
    freezeTableName: true,
  }
);

module.exports = comments;
