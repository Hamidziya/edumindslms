const express = require("express");
const {
  uniRegister,
  universityLogin,
  sendOtp,
  verifyOtp,
} = require("../controllers/uniController");
const router = express.Router();

router.post("/uniRegister", uniRegister);
router.post("/universityLogin", universityLogin);
router.post("/sendOtp", sendOtp);
router.post("verifyOtp", verifyOtp);

module.exports = router;
