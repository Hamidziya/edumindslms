const fs = require("fs");
const path = require("path");
const multer = require("multer");

const uploadFolder = "./uploads/";

// Check if the uploads folder exists; if not, create it
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

// Configure multer storage with a prefix "edu" for filenames
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder); // Save in 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "edu-" + uniqueSuffix + path.extname(file.originalname)); // Prefix with 'edu'
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
