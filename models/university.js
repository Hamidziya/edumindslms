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
    isRegistered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    password: { type: DataTypes.STRING, allowNull: false },
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
    gender: {
      type: DataTypes.STRING,
    },
    gpa: {
      type: DataTypes.STRING,
    },
    houserholdIncome: {
      type: DataTypes.STRING,
    },
    needbasedAid: {
      type: DataTypes.DATE,
    },
    appFile: {
      type: DataTypes.STRING,
    },
    collegeName: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    dob: {
      type: DataTypes.DATE,
    },
    country: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "university",
    freezeTableName: true,
  }
);

University.beforeCreate(async (university) => {
  university.password = await bcrypt.hash(university.password, 10);
});

University.beforeUpdate(async (university) => {
  if (university.changed("password")) {
    university.password = await bcrypt.hash(university.password, 10);
  }
});

module.exports = University;
