const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db").sequelize;

const Holiday = sequelize.define("Holiday", {
  holidayId: {
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
  day: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  region: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Holiday;
