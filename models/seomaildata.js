const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db").sequelize;

const seomaildata = sequelize.define(
  "seomaildata",
  {
    seoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    // otp: {
    //   type: DataTypes.INTEGER,
    //   //defaultValue: false,
    // },
    date: {
      type: DataTypes.DATEONLY,
      //allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "seomaildata",
    freezeTableName: true,
  }
);

module.exports = seomaildata;
