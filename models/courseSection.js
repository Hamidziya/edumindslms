const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db").sequelize;

const coursesection = sequelize.define(
  "coursesection",
  {
    courseSectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    sectionNumberId: {
      type: DataTypes.STRING,
    },
    chapterNumber: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    courseId: {
      type: DataTypes.STRING,
      //defaultValue: [],
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

module.exports = coursesection;
