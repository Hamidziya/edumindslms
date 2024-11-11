const express = require("express");
const {
  register,
  login,
  getRegistratedUsers,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/getRegistratedUsers", getRegistratedUsers);

module.exports = router;
