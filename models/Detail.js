const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db").sequelize;

const Course = sequelize.define(
  "details",
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
    tableName: "details",
    freezeTableName: true,
  }
);

module.exports = Course;
