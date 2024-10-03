const express = require("express");
const { saveBlog } = require("../controllers/blogController");
const { getAttendance } = require("../controllers/attendanceController");

const auth = require("../middleware/auth");
const router = express.Router();

router.post("/saveBlog", saveBlog);
router.post("/getAttendance", auth, getAttendance);

module.exports = router;
