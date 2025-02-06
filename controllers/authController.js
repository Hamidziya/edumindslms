const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Detail = require("../models/courseSectionFolder");

require("dotenv").config();

exports.register = async (req, res) => {
  const toSave = req.body.data;
  try {
    const users = await User.findAll({
      where: {
        email: toSave.email,
      },
    });
    if (users.length > 0) {
      return res.status(201).json({ message: "User Already Exist" });
    }
    const user = await User.create(toSave);
    res.status(200).json({
      message: "User Registered successfully",
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRegistratedUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        isDelete: false,
        isRegistration: true,
      },
    });
    if (users.length == 0) {
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

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.userId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Return token and some user info (but not sensitive data like password)
    res.json({
      token,
      user,
      email,
      //password,
    });
  } catch (err) {
    console.error("Error during login process:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.loginDummy = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.userId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
