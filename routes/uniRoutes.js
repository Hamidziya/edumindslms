const express = require("express");
const { uniRegister } = require("../controllers/uniController");
const router = express.Router();

router.post("/uniRegister", uniRegister);
// router.post("/login", login);
// router.post("/getRegistratedUsers", getRegistratedUsers);

module.exports = router;
