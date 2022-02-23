const express = require('express');
const {
  addUser,
  getUserById,
  deleteUser,
} = require('../controller/user.controller');

const router = express.Router();

router.route('/').post(addUser);

router.route('/:id').get(getUserById).delete(deleteUser);

module.exports = router;
