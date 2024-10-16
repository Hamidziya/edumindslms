const Course = require("../models/Course");
const Detail = require("../models/Detail");

exports.createCourse = async (req, res) => {
  const { title, description, price } = req.body;

  try {
    const newCourse = await Course.create({
      title,
      description,
      //duration,
      price,
    });

    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  const { username, email, role, isDelete, isPermission } = req.body;
  const userId = req.body.id;

  try {
    const user = await Course.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.update({
      username: username,
      email: email || user.email,
      role: role || user.role,
    });

    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  const courseId = req.body.courseId;

  try {
    const course = await Course.findByPk(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.update({
      isDelete: true,
    });

    res.status(200).json({ message: "Course updated successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getActiveCourseList = async (req, res) => {
  try {
    const courses = await Course.findAll({
      where: { isDelete: false },
    });

    if (courses.length === 0) {
      return res.status(404).json({ message: "No active Course found" });
    }

    res
      .status(200)
      .json({ message: "Course List", status: "success", data: courses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getActiveCourseListDummy = async (req, res) => {
  try {
    const courses = await Course.findAll({
      where: { isDelete: false },
    });

    if (courses.length === 0) {
      return res.status(404).json({ message: "No active Course found" });
    }

    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getActiveCourseListDummy1 = async (req, res) => {
  try {
    const courses = await Course.findAll({
      where: { isDelete: false },
    });

    if (courses.length === 0) {
      return res.status(404).json({ message: "No active Course found" });
    }

    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
