const User = require("../models/User");
const Course = require("../models/Course");
const Holiday = require("../models/Holiday");

exports.saveHoliday = async (req, res) => {
  try {
    const toSave = req.body.data;

    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only Admin Can Create New Holidays",
        status: "error",
      });
    }

    const newholiday = await Holiday.bulkCreate(toSave);

    res.status(200).json({
      message: "New Holiday Added",
      status: "success",
      data: newholiday,
    });
  } catch (error) {
    console.error("Error fetching user courses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateHoliday = async (req, res) => {
  const toUpdate = req.body;

  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only Admin Can Update The Holiday" });
    }
    await Holiday.update(toUpdate, {
      where: { holidayId: req.body.holidayId },
    });
    res
      .status(200)
      .json({ message: "Holiday Updated successfully", status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeHolidayList = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only Admin Can Remove The Holiday List" });
    }
    const toUpdate = { isDelete: true };

    await Holiday.update(toUpdate, {
      where: { isDelete: false },
    });
    res
      .status(200)
      .json({ message: "Holiday Removed successfully", status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeSpecificHoliday = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only Admin Can Remove The Holiday List" });
    }
    const toUpdate = { isDelete: true };

    await Holiday.update(toUpdate, {
      where: { holidayId: req.body.data.holidayId },
    });
    res
      .status(200)
      .json({ message: "Holiday Removed successfully", status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getActiveHolidayList = async (req, res) => {
  try {
    const holidays = await Holiday.findAll({
      where: { isDelete: false },
    });

    if (holidays.length === 0) {
      return res.status(404).json({ message: "No active holidays found" });
    }

    res.status(200).json(holidays);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getActiveHolidayDetail = async (req, res) => {
  try {
    const holidays = await Holiday.findAll({
      where: { title: "Chrismas" },
    });

    if (holidays.length === 0) {
      return res.status(404).json({ message: "No active holidays found" });
    }

    res.status(200).json(holidays);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
