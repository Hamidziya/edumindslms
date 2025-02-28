const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const seomaildata = require("../models/seomaildata");
const Detail = require("../models/courseSectionFolder");

require("dotenv").config();

exports.saveEmail = async (req, res) => {
  const toSave = req.body;
  try {
    const seodata = await seomaildata.findAll({
      where: {
        email: toSave.email,
      },
    });
    if (seodata.length > 0) {
      return res.status(201).json({ message: "User Already Exist" });
    }
    const user = await seomaildata.create(toSave);
    res.status(200).json({
      message: "data saved successfully",
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.saveEmailWithName = async (req, res) => {
  const toSave = req.body;
  try {
    const seodata = await seomaildata.findAll({
      where: {
        email: toSave.email,
      },
    });
    if (seodata.length > 0) {
      return res.status(201).json({ message: "User Already Exist" });
    }
    const user = await seomaildata.create(toSave);
    res.status(200).json({
      message: "data saved successfully",
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listOfTheEmails = async (req, res) => {
  try {
    const seodata = await seomaildata.findAll({
      where: {
        isDelete: false,
        //isRegistration: true,
      },
    });
    if (seodata.length == 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User List",
      status: "success",
      data: seodata,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.deleteUserCourse = async (req, res) => {
//   const { userid, courseIdToDelete } = req.body;

//   try {
//     const user = await User.findByPk(userid);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     let existingCourses = user.courseIds || [];
//     const updatedCourses = existingCourses.filter(
//       (course) => course.courseId !== courseIdToDelete
//     );
//     await user.update({ courseIds: updatedCourses });

//     res.status(200).json({ message: "Course removed successfully", user });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user.userId, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "24h" }
//     );

//     // Return token and some user info (but not sensitive data like password)
//     res.json({
//       token,
//       user,
//       email,
//       //password,
//     });
//   } catch (err) {
//     console.error("Error during login process:", err);
//     res.status(500).json({ error: err.message });
//   }
// };
