const mongoose = require('mongoose');
const BALLOONS = require('../__Mock__/balloons');
const Balloon = require('../models/balloon.model');
const dbConnection = require('./dbConnection');

async function dbPopulate() {
  await dbConnection();
  await Balloon.deleteMany({});
  await Balloon.insertMany(BALLOONS);
  mongoose.disconnect();
}
