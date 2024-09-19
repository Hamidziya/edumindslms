const express = require('express');
const { createUser } = require('../controllers/userController');
const { updateUser } = require('../controllers/userController');
const { getUserCourse } = require('../controllers/userController');

const auth = require('../middleware/auth');
const router = express.Router();

router.post('/create', auth, createUser);
router.post('/updateUser', auth, updateUser);
router.post('/getUserCourse', auth, getUserCourse);

module.exports = router;
