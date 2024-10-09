const User = require("../models/User");
const Course = require("../models/Course");
// const Holiday = require("../models/Holiday");
// const Attendance = require("../models/Attendance");

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

exports.createUsers = async (req, res) => {
  const users = req.body.data;
  if (!Array.isArray(users)) {
    return res.status(400).json({ message: "Invalid data format" });
  }

  for (const user of users) {
    const { role } = user;
    if (
      req.user.role !== "admin" &&
      !(
        (req.user.role === "teacher" || req.user.role === "manager") &&
        role === "student"
      )
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }
  }

  try {
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
        return user;
      })
    );

    const newUsers = await User.bulkCreate(hashedUsers);
    res.status(201).json(newUsers);
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

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        isDelete: false,
      },
    });
    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User List",
      status: "success",
      data: users,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.byUserCourse = async (req, res) => {
  const { userid, courseIds: newCourses } = req.body;

  try {
    const user = await User.findByPk(userid);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let existingCourses = user.courseIds || [];

    if (Array.isArray(newCourses)) {
      newCourses.forEach((newCourse) => {
        const courseExists = existingCourses.some(
          (existingCourse) => existingCourse.courseId === newCourse.courseId
        );

        if (!courseExists) {
          existingCourses.push(newCourse);
        }
      });
    }

    await user.update({ courseIds: existingCourses });

    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUserCourse = async (req, res) => {
  const { userid, courseIdToDelete } = req.body;

  try {
    const user = await User.findByPk(userid);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let existingCourses = user.courseIds || [];
    const updatedCourses = existingCourses.filter(
      (course) => course.courseId !== courseIdToDelete
    );
    await user.update({ courseIds: updatedCourses });

    res.status(200).json({ message: "Course removed successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

exports.getUserCourseDetailDummy = async (req, res) => {
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

exports.getUserCourseDummy = async (req, res) => {
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

exports.deleteUserCourseDummy = async (req, res) => {
  const { userid, courseIdToDelete } = req.body;

  try {
    const user = await User.findByPk(userid);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let existingCourses = user.courseIds || [];
    const updatedCourses = existingCourses.filter(
      (course) => course.courseId !== courseIdToDelete
    );
    await user.update({ courseIds: updatedCourses });

    res.status(200).json({ message: "Course removed successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.byUserCourseDummy = async (req, res) => {
  const { userid, courseIds: newCourses } = req.body;

  try {
    const user = await User.findByPk(userid);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let existingCourses = user.courseIds || [];

    if (Array.isArray(newCourses)) {
      newCourses.forEach((newCourse) => {
        const courseExists = existingCourses.some(
          (existingCourse) => existingCourse.courseId === newCourse.courseId
        );

        if (!courseExists) {
          existingCourses.push(newCourse);
        }
      });
    }

    await user.update({ courseIds: existingCourses });

    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.byUserCourseDummy2 = async (req, res) => {
  const { userid, courseIds: newCourses } = req.body;

  try {
    const user = await User.findByPk(userid);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let existingCourses = user.courseIds || [];

    if (Array.isArray(newCourses)) {
      newCourses.forEach((newCourse) => {
        const courseExists = existingCourses.some(
          (existingCourse) => existingCourse.courseId === newCourse.courseId
        );

        if (!courseExists) {
          existingCourses.push(newCourse);
        }
      });
    }

    await user.update({ courseIds: existingCourses });

    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
