const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
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
    credentials: true, // If cookies or authorization headers are needed
  })
);

// Handle preflight requests for all routes
app.options("*", cors()); // Optional, but keeps it functional.

app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/holiday", holidayRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/event", eventRoutes);

// Route to serve a file from the uploads folder by filename
app.get("/uploads/:filename", (req, res) => {
  const { filename } = req.params;

  // Define the file path
  const filePath = path.join(__dirname, "uploads", filename);

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // If the file doesn't exist, return a 404 error
      return res.status(404).json({ message: "File not found" });
    }

    // If the file exists, send it as the response
    res.sendFile(filePath, (err) => {
      if (err) {
        // Handle error if file sending fails
        return res.status(500).json({ message: "Error sending file" });
      }
    });
  });
});

// Serve static files from the 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Root route
app.get("/", (req, res) => {
  return res.json({
    message: `Welcome To Eduminds Learning Portal`,
  });
});

// Example route with a dynamic name parameter
app.get("/name/:name", (req, res) => {
  const { name } = req.params;
  return res.json({
    message: `Welcome Mr./Ms. ${name} To Eduminds Learning Portal`,
  });
});

module.exports = app;
