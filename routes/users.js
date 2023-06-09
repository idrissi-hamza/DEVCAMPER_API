const express = require('express');

const {
  getUsers,
  updateUser,
  getUser,
  createUser,
  deleteUser,
} = require('../controllers/user');

const User = require('../models/User');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');


//apply middlwqwares on all routes
router.use(protect);
router.use(authorize('admin'));

router.route('/').get(advancedResults(User), getUsers).post(createUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
