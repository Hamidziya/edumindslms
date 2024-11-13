const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db").sequelize;

const Course = sequelize.define(
  "courses",
  {
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    courseNumberId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseImage: {
      type: DataTypes.BLOB("long"),
    },
    courseImageType: {
      type: DataTypes.STRING, // Store MIME type, e.g., "image/png" or "application/pdf"
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    tableName: "courses",
    freezeTableName: true,
  }
);

module.exports = Course;
