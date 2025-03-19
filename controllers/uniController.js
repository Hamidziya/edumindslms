const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const university = require("../models/university");
const Detail = require("../models/courseSectionFolder");
const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
//const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const User = require("../models/User"); // Assuming you have a User model
const uniOtp = require("../models/uniOtp"); // OTP table
const crypto = require("crypto");
require("dotenv").config();
// Email transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

exports.uniRegister = async (req, res) => {
  const toSave = req.body;
  toSave.isRegistered = true;
  try {
    const users = await university.findAll({ where: { email: toSave.email } });
    if (users.length > 0) {
      return res.status(201).json({ message: "User Already Exist" });
    }
    const user = await university.create(toSave);
    res.status(200).json({
      message: "Registered successfully",
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createStudent = async (req, res) => {
  const tosave = req.body.data;
  try {
    const users = await university.findAll({
      where: {
        email: tosave.email,
      },
    });
    if (users.length > 0) {
      return res.status(201).json({ message: "User Already Exist" });
    }

    const newUser = await university.create(tosave);
    res
      .status(201)
      .json({ message: "Student Created", status: "success", data: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.universityLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await university.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.userId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      token,
      user,
      email,
      //password
    });
  } catch (err) {
    console.error("Error during login process:", err);
    res.status(500).json({ error: err.message });
  }
};

//forget password

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      where: { email: email },
    });
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const otp = crypto.randomInt(100000, 999999);

    const existingOtp = await uniOtp.findOne({
      where: { email: email },
    });

    if (existingOtp) {
      existingOtp.otp = otp;
      existingOtp.date = new Date();
      await existingOtp.save();
    } else {
      await uniOtp.create({
        userId: user.userId,
        email,
        otp,
        date: new Date(),
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for Password Reset",
      text: `Your OTP for password reset is ${otp}. It is valid for 5 minutes.`,
    };
    await transporter.sendMail(mailOptions);

    res.json({ status: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const validOtp = await uniOtp.findOne({
      where: {
        email,
        otp,
        date: new Date(),
        time: { [Op.gte]: new Date(Date.now() - 5 * 60000) },
      },
    });

    if (!validOtp) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid OTP or expired" });
    }

    res.json({ status: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const validOtp = await uniOtp.findOne({
      where: {
        email,
        otp,
        date: new Date(),
        time: { [Op.gte]: new Date(Date.now() - 5 * 60000) },
      },
    });

    if (!validOtp) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid OTP or expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.update({ password: hashedPassword }, { where: { email } });

    await uniOtp.destroy({ where: { email } });

    res.json({ status: true, message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};
