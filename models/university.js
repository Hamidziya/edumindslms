const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db").sequelize;

const University = sequelize.define(
  "university",
  {
    universityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // image: {
    //   type: DataTypes.STRING,
    // },
    // day: {
    //   type: DataTypes.TEXT,
    // },
    description: {
      type: DataTypes.STRING,
    },
    // date: {
    //   type: DataTypes.DATE,
    // },
    // region: {
    //   type: DataTypes.TEXT,
    // },
  },
  {
    tableName: "university",
    freezeTableName: true,
  }
);

module.exports = University;
