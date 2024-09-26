const express = require("express");
const { markAttendance } = require("../controllers/attendanceController");
const { getAttendance } = require("../controllers/attendanceController");

const auth = require("../middleware/auth");
const router = express.Router();

router.post("/markAttendance", auth, markAttendance);
router.post("/getAttendance", auth, getAttendance);

module.exports = router;
