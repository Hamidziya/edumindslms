const express = require("express");
const {
  uniRegister,
  universityLogin,
  sendOtp,
} = require("../controllers/uniController");
const router = express.Router();

router.post("/uniRegister", uniRegister);
router.post("/login", universityLogin);
router.post("/sendOtp", sendOtp);

module.exports = router;
