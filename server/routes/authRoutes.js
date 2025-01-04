const express = require('express');
const { register } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/admin-login', adminLogin);

module.exports = router;