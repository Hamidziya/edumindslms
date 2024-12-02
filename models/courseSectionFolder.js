const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db").sequelize;

const details = sequelize.define(
  "coursesectionfolder",
  {
    folderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    courseSectionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sectionDetailNumber: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    description: {
      type: DataTypes.TEXT,
      //allowNull: false,
    },
    links: {
      type: DataTypes.JSON, // Store links as JSON
      //allowNull: true, // Can be null if no links are provided
      defaultValue: [], // Initialize with an empty array
    },
    files: {
      type: DataTypes.JSON, // Store an array of file details as JSON
      //allowNull: true,
      defaultValue: [], // Initialize with an empty array
    },
  },
  {
    tableName: "coursesectionfolder",
    freezeTableName: true,
  }
);

module.exports = details;
