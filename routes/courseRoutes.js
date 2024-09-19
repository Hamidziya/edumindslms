const express = require('express');
const { createCourse } = require('../controllers/courseController');
const { updateCourse } = require('../controllers/courseController');

const auth = require('../middleware/auth');
const router = express.Router();

router.post('/createCourse', auth, createCourse);
router.post('/updateCourse', auth, updateCourse);

module.exports = router;
