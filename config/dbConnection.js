/* eslint-disable operator-linebreak */
const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config();

async function dbConnection() {
  const uri =
    process.env.NODE_ENV === 'test'
      ? process.env.MONGO_URI_TEST
      : process.env.MONGO_URI;

  const response = await mongoose.connect(uri);

  return response;
}

module.exports = dbConnection;
