const express = require("express");
const sequelize = require("./config/db").sequelize;
const app = require("./app");

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully.");

    // Check if the environment is not Vercel (i.e., running locally)
    if (process.env.NODE_ENV !== "production") {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = app;
