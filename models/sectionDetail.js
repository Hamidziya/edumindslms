const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db").sequelize;

const details = sequelize.define(
  "details",
  {
    detailId: {
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

module.exports = details;
