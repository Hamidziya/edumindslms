const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const sequelize = require("./config/db");
//const auth = require("./middleware/auth");

const app = express();
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/course", courseRoutes);

//sequelize.sync().then(() => console.log('DB Synced'));

module.exports = app;
