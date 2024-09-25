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
