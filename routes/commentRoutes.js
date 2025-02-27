const express = require("express");
const {
  saveComments,
  commentListOnBlog,
  deleteComment,
} = require("../controllers/commentController");
const router = express.Router();

router.post("/saveComments", saveComments);
router.post("/commentListOnBlog", commentListOnBlog);
router.post("/deleteComment", deleteComment);
//router.post("verifyOtp", verifyOtp);

module.exports = router;
