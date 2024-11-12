const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const holidayRoutes = require("./routes/holidayRoutes");
const courseRoutes = require("./routes/courseRoutes");
const blogRoutes = require("./routes/blogRoutes");
const eventRoutes = require("./routes/eventRouts");

const app = express();

// Enable CORS for specified origins
app.use(
  cors({
    origin: ["http://localhost:5173", "https://test.eduplaced.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    //credentials: true, // If cookies or authorization headers are needed
  })
);

// Handle preflight requests for all routes
app.options("*", cors());

// Middleware
app.use(bodyParser.json());

// Route definitions
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/holiday", holidayRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/event", eventRoutes);

app.get("/", (req, res) => {
  return res.json({
    message: `Welcome To Eduminds Learning Portal`,
  });
});

app.get("/name/:name", (req, res) => {
  const { name } = req.params;
  return res.json({
    message: `Welcome Mr./Ms. ${name} To Eduminds Learning Portal`,
  });
});

module.exports = app;
