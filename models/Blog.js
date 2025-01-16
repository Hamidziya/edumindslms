const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db").sequelize;

const Blog = sequelize.define(
  "blogs",
  {
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    title: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
    blogType: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
    titleType: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
    tag: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
    og: {
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
    description: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATE,
    },
    region: {
      type: DataTypes.TEXT,
    },
    //Title,
    Url: {
      type: DataTypes.STRING,
    },
    //metaTitle,
    //metaDescription,
    Keywoards: {
      type: DataTypes.STRING,
    },
    ReadTime: {
      type: DataTypes.STRING,
    },
    AutherName: {
      type: DataTypes.STRING,
    },
    //BlogTag,
    //BlogDate,
    // ImageUpload,
    BlogContent: {
      type: DataTypes.STRING,
    },
    //RelationshipType:{
    //   type:DataTypes.TEXT
    // }
  },
  {
    tableName: "blogs",
    freezeTableName: true,
  }
);

module.exports = Blog;
