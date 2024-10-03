const express = require("express");
const { saveBlog } = require("../controllers/blogController");
const { getBlogList } = require("../controllers/blogController");
const { getBlogDetail } = require("../controllers/blogController");

const auth = require("../middleware/auth");
const router = express.Router();

router.post("/saveBlog", saveBlog);
router.post("/getBlogList", getBlogList);
router.post("/getBlogDetail", getBlogDetail);

module.exports = router;
