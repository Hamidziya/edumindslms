const express = require("express");
const { saveEvent } = require("../controllers/eventController");
const {
  getBlogList,
  getBlogDetail,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
// const { getBlogDetail } = require("../controllers/blogController");
// const { updateBlog } = require("../controllers/blogController");
// const { deleteBlog } = require("../controllers/blogController");

const auth = require("../middleware/auth");
const router = express.Router();

router.post("/saveEvent", saveEvent);
router.get("/getBlogList", getBlogList);
router.get("/getBlogDetail", getBlogDetail);
router.post("/updateBlog", updateBlog);
router.post("/deleteBlog", deleteBlog);

module.exports = router;
