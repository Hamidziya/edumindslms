const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db").sequelize;

const Blog = sequelize.define(
  "blogs",
  {
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    titleType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    day: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATE,
    },
    region: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "blogs",
    freezeTableName: true,
  }
);

module.exports = Blog;
