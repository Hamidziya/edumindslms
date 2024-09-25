const express = require("express");
const { saveHoliday } = require("../controllers/holidayController");
const { getActiveHolidayList } = require("../controllers/holidayController");
const { removeSpecificHoliday } = require("../controllers/holidayController");

const auth = require("../middleware/auth");
const router = express.Router();
router.post("/saveHoliday", auth, saveHoliday);
router.get("/getActiveHolidayList", getActiveHolidayList);
router.post("/removeSpecificHoliday", auth, removeSpecificHoliday);

module.exports = router;
