const Course = require("../models/Course");
const Detail = require("../models/Detail");
const Attendance = require("../models/Attendance");

exports.markAttendance = async (req, res) => {
  const toSave = req.body.data;

  try {
    const newCourse = await Attendance.create(toSave);

    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAttendance = async (req, res) => {
  const userId = req.body.userId;

  try {
    const attendance = await Attendance.findAll({
      where: {
        userId: userId,
      },
    });
    if (!attendance) {
      return res.status(404).json({ message: "User not found" });
    }

    // await user.update({
    //   username: username,
    //   email: email || user.email,
    //   role: role || user.role,
    //   //companyName: "Eduminds"
    // });

    res.status(200).json({
      message: "Attendance List",
      status: "success",
      data: attendance,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAttendance = async (req, res) => {
  const attendanceId = req.body.attendanceId;

  try {
    const attendance = await Attendance.findByPk(attendanceId);

    if (!user) {
      return res.status(404).json({ message: "Attendance not found" });
    }
    await attendance.update({ isDelete: true });

    res.status(200).json({
      message: "Attendance List",
      status: "success",
      data: attendance,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
