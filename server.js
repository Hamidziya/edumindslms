const express = require('express');
const sequelize = require('./config/db').sequelize; // Import sequelize instance
const app = require('./app'); // Import the app with routes and middleware

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    // Sync the database schema with the models
    await sequelize.sync({ alter: true });  // This will update the table schema without dropping it
    console.log('Database synchronized successfully.');

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
