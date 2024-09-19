const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db').sequelize;

const Course = sequelize.define('Course', {
  courseId: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    autoIncrement: true, 
    primaryKey: true 
  },
  title: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  description: { 
    type: DataTypes.TEXT, 
    allowNull: false 
  },
  price: { 
    type: DataTypes.DECIMAL, 
    allowNull: false 
  },
});

module.exports = Course;
