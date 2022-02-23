const express = require('express');
const logUser = require('../controller/login.controller');

const router = express.Router();

router.route('/').post(logUser);

module.exports = router;
