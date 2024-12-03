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
const User = require("./models/User");

const app = express();

// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5173", // Development frontend
  "https://test.eduplaced.com", // Testing frontend
  "https://study.eduplaced.com",
  "https://eduplaced.edumindslearning.com", // Production frontend
];

// Enable CORS for specific origins
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Allow cookies or authentication headers
  })
);

// Handle preflight OPTIONS requests
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.status(204).end();
});

app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/holiday", holidayRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/event", eventRoutes);

// Serve files from 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Example route to return a dynamic greeting
app.get("/name/:name", (req, res) => {
  const { name } = req.params;
  return res.json({
    message: `Welcome Mr./Ms. ${name} To Eduplaced Learning Portal`,
  });
});

app.get("/", (req, res) => {
  const { name } = req.params;
  return res.json({
    message: `Welcome To Eduplaced Learning Portal`,
  });
});

// Route to update user data
app.post("/update", async (req, res) => {
  const data = req.body;
  try {
    const result = await User.update(
      { courseIds: data.courseIds },
      { where: { userId: data.userid } }
    );
    return res.json({
      message: "User updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Handle uploads
app.get("/uploads/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "uploads", filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "File not found" });
    }
    res.sendFile(filePath, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error sending file" });
      }
    });
  });
});

// Delete a specific file
app.delete("/uploads/:filename?", (req, res) => {
  const { filename } = req.params;
  if (filename) {
    const filePath = path.join(__dirname, "uploads", filename);
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ message: "File not found" });
      }
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error deleting file:", unlinkErr);
          return res.status(500).json({ message: "Error deleting file" });
        }
        res.status(200).json({ message: "File deleted successfully" });
      });
    });
  }
});

app.get("/uploadList", (req, res) => {
  const uploadsDir = path.join(__dirname, "uploads");

  // Check if the uploads directory exists
  fs.access(uploadsDir, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "Uploads folder not found" });
    }

    // Read files in the uploads directory
    fs.readdir(uploadsDir, (err, files) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error reading uploads folder" });
      }

      // Respond with the list of files
      res.json({ files });
    });
  });
});

// Delete all files
app.post("/uploads/:filename?", (req, res) => {
  const { filename } = req.params;
  if (filename === "deleteall") {
    const uploadsPath = path.join(__dirname, "uploads");
    fs.readdir(uploadsPath, (err, files) => {
      if (err) {
        console.error("Error reading uploads folder:", err);
        return res
          .status(500)
          .json({ message: "Error reading uploads folder" });
      }
      const deletePromises = files.map((file) =>
        fs.promises.unlink(path.join(uploadsPath, file))
      );
      Promise.all(deletePromises)
        .then(() =>
          res.status(200).json({ message: "All files deleted successfully" })
        )
        .catch((error) => {
          console.error("Error deleting files:", error);
          res.status(500).json({ message: "Error deleting files" });
        });
    });
  }
});

module.exports = app;
