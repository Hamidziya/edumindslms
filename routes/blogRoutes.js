const express = require("express");
const { saveBlog } = require("../controllers/blogController");
const { getBlogList } = require("../controllers/blogController");
const { getBlogDetail } = require("../controllers/blogController");
const { updateBlog } = require("../controllers/blogController");
const { deleteBlog } = require("../controllers/blogController");

const auth = require("../middleware/auth");
const router = express.Router();

router.post("/saveBlog", saveBlog);
router.get("/getBlogList", getBlogList);
router.get("/getBlogDetail", getBlogDetail);
router.post("/updateBlog", updateBlog);
router.post("/deleteBlog", deleteBlog);

module.exports = router;
