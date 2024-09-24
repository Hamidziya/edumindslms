const { Sequelize } = require("sequelize");
require("dotenv").config();

// Setup Sequelize instance with SSL configuration
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectModule: require("mysql2"),
    dialectOptions: {
      ssl: {
        require: true, // Enforce SSL connection
        rejectUnauthorized: false, // Optional: For self-signed certificates, set to false if necessary
      },
    },
  }
);

module.exports = { sequelize };
