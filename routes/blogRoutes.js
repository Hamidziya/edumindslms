const express = require("express");
const { saveBlog } = require("../controllers/blogController");
const { getBlogList } = require("../controllers/blogController");
const { getBlogDetail } = require("../controllers/blogController");
const { updateBlog } = require("../controllers/blogController");
const {
  deleteBlog,
  activateBlog,
  getBlogListEduminds,
  getBlogListEduplaced,
  getBlogListEthree,
  getBlogListDashboard,
  getBlogListEdumedia,
} = require("../controllers/blogController");

const auth = require("../middleware/auth");
const router = express.Router();

router.post("/saveBlog", saveBlog);
router.get("/getBlogList", getBlogList);
router.get("/getBlogDetail", getBlogDetail);
router.post("/updateBlog", updateBlog);
router.post("/deleteBlog", deleteBlog);
router.post("/activateBlog", activateBlog);
router.post("/getBlogListEduminds", getBlogListEduminds);
router.post("/getBlogListEduplaced", getBlogListEduplaced);
router.post("/getBlogListEthree", getBlogListEthree);
router.post("/getBlogListDashboard", getBlogListDashboard);
router.post("/getBlogListEdumedia", getBlogListEdumedia);

module.exports = router;
