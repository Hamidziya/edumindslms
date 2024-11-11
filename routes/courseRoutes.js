const express = require("express");
const {
  createCourse,
  updateCourse,
  deleteCourse,
  getActiveCourseList,
  createCourseSection,
  updateCourseSection,
  deleteCourseSection,
  getActiveCourseSectionList,
} = require("../controllers/courseController");
//const { updateCourse } = require('../controllers/courseController');

const auth = require("../middleware/auth");
const router = express.Router();

router.post("/createCourse", auth, createCourse);
router.post("/updateCourse", auth, updateCourse);
router.post("/deleteCourse", auth, deleteCourse);
router.post("/getActiveCourseList", auth, getActiveCourseList);
router.post("/createCourseSection", auth, createCourseSection);
router.post("/updateCourseSection", auth, updateCourseSection);
router.post("/deleteCourseSection", auth, deleteCourseSection);
router.post("/getActiveCourseSectionList", auth, getActiveCourseSectionList);

module.exports = router;
