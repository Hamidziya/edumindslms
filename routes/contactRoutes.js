const express = require("express");
const {
  saveContact,
  listOfTheContacts,
} = require("../controllers/contactController");
const router = express.Router();

router.post("/saveContact", saveContact);
//router.post("/saveEmailWithName", saveEmailWithName);
router.post("/listOfTheContacts", listOfTheContacts);
//router.post("verifyOtp", verifyOtp);

module.exports = router;
