const express = require('express');
const { register, login, getMe, forgotpassword, resetPassword } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').get(protect, getMe);
router.post('/forgotpassword', forgotpassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
