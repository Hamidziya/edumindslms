const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db").sequelize;

const Course = sequelize.define(
  "coursesection",
  {
    courseSectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "coursesection",
    freezeTableName: true,
  }
);

module.exports = Course;
