const User = require("../models/User");
const Course = require("../models/Course");
const Holiday = require("../models/Holiday");
const Attendance = require("../models/Attendance");

exports.createUser = async (req, res) => {
  const tosave = req.body.data;
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
    const users = await User.findAll({
      where: {
        email: tosave.email,
      },
    });
    if (users.length > 0) {
      return res.status(201).json({ message: "User Already Exist" });
    }

    const newUser = await User.create(tosave);
    res
      .status(201)
      .json({ message: "User Created", status: "success", data: newUser });
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
      return res
        .status(403)
        .json({ message: "You are not allowed to create new users" });
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
    res
      .status(201)
      .json({ message: "user created", status: "success", newUsers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const toUpdate = req.body;
  const userId = req.body.userId;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.update(toUpdate);
    res.status(200).json({
      message: "User updated successfully",
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        isDelete: false,
        isRegistration: false,
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

exports.deleteUser = async (req, res) => {
  const userId = req.body.userId;

  try {
    await User.update(
      { isDelete: true },
      {
        where: { userId: userId },
      }
    );
    res.status(200).json({
      message: "User Deleted successfully",
      status: "success",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUserPassword = async (req, res) => {
  const toUpdate = req.body;
  const userId = req.body.userId;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const originalData = { ...user.get() };
    let newuser = await user.update(toUpdate);
    // let newuser = await user.update(toUpdate);

    const changedFields = [];
    Object.keys(toUpdate).forEach((field) => {
      if (user.changed(field)) {
        changedFields.push(field);
      }
    });

    if (changedFields.length === 0) {
      return res.status(200).json({
        message: "No data was modified",
        status: "success",
        data: { user: originalData },
      });
    }

    res.status(200).json({
      message: "Password updated successfully",
      status: "success",
      data: { newuser, changedFields },
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

    let result = await User.update(
      { courseIds: existingCourses },
      { where: { userId: userid } }
    );

    return res.status(200).json({
      message: "Course Assigned successfully",
      status: "success",
      // data: result,
    });
  } catch (err) {
    console.error("Error:", err.message);
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
        isDelete: false,
      },
    });

    const courseDetails = courses.map((course) => ({
      courseId: course.courseId,
      title: course.title,
      description: course.description,
      price: course.price,
      courseImage: course.courseImage,
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
      courseImage: course.courseImage,
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

exports.getUserCourseDetailNew = async (req, res) => {
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
      courseImage: course.courseImage,
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
