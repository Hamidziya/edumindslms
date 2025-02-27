const express = require("express");
const {
  saveComments,
  commentListOnBlog,
} = require("../controllers/commentController");
const router = express.Router();

router.post("/saveComments", saveComments);
router.post("/commentListOnBlog", commentListOnBlog);
//router.post("/listOfTheEmails", listOfTheEmails);
//router.post("verifyOtp", verifyOtp);

module.exports = router;
