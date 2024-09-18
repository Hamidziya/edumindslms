const express = require('express');
const { createUser } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/create', auth, createUser);

module.exports = router;
