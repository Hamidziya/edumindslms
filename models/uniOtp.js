const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db").sequelize;

const uniOtp = sequelize.define(
  "uniotp",
  {
    otpId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      //allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.INTEGER,
      //defaultValue: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "uniotp",
    freezeTableName: true,
  }
);

module.exports = uniOtp;
