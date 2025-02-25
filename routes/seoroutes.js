const express = require("express");
const {
  saveEmail,
  saveEmailWithName,
  listOfTheEmails,
} = require("../controllers/seomailcontroller");
const router = express.Router();

router.post("/saveEmail", saveEmail);
router.post("/saveEmailWithName", saveEmailWithName);
router.post("/listOfTheEmails", listOfTheEmails);
//router.post("verifyOtp", verifyOtp);

module.exports = router;
