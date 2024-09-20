const User = require("../models/User");
const Course = require("../models/Course");
const Holiday = require("../models/Holiday");

exports.createUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  if (
    req.user.role !== "admin" &&
    !(
      (req.user.role === "teacher" || req.user.role === "manager") &&
      role === "student"
    )
  ) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  try {
    const newUser = await User.create({ username, email, password, role });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const toUpdate = req.body;
  const userId = req.body.userid;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.update(toUpdate);
    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.saveUser = async (req, res) => {
//   try {
//     let toSave = req.body;
//     //let cardId = req.body.cardId
//     let newuser = await User.create(toSave);
//     let id = newuser.id;
//   } catch {}
// };

exports.getUserCourse = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const courseIds = user.courseIds.map((course) => course.courseId);
    const courses = await Course.findAll({
      where: {
        courseId: courseIds,
      },
    });

    const courseDetails = courses.map((course) => ({
      courseId: course.courseId,
      title: course.title,
      description: course.description,
      price: course.price,
    }));

    res.status(200).json({
      username: user.username,
      email: user.email,
      role: user.role,
      courses: courseDetails,
    });
  } catch (error) {
    console.error("Error fetching user courses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserCourseDetail = async (req, res) => {
  try {
    const userId = req.body.userId;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const courseIds = user.courseIds.map((course) => course.courseId);
    const courses = await Course.findAll({
      where: {
        courseId: courseIds,
      },
    });

    const courseDetails = courses.map((course) => ({
      courseId: course.courseId,
      title: course.title,
      description: course.description,
      price: course.price,
    }));

    res.status(200).json({
      username: user.username,
      email: user.email,
      role: user.role,
      courses: courseDetails,
    });
  } catch (error) {
    console.error("Error fetching user courses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.saveHoliday = async (req, res) => {
  try {
    const toSave = req.body.data;

    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only Admin Can Create New Holidays",
        status: "error",
      });
    }

    const newholiday = await Holiday.create(toSave);

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
