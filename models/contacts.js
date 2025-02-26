const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db").sequelize;

const contacts = sequelize.define(
  "contacts",
  {
    contactId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    // userId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    isDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    blogType: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
    contactType: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
    blogView: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
    likes: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    blogImage: {
      type: DataTypes.STRING,
    },
    day: {
      type: DataTypes.TEXT,
    },
    message: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "contacts",
    freezeTableName: true,
  }
);

module.exports = contacts;
