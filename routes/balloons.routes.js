const express = require('express');
const {
  getAllBalloons,
  getBallonById,
  addBalloon,
} = require('../controller/balloon.controller');

const router = express.Router();

router.route('/').get(getAllBalloons).post(addBalloon);

router.route('/:id').get(getBallonById);

module.exports = router;
