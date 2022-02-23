/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

async function checkPassword(password, user) {
  if (!user.password) {
    return false;
  }
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}

function createJWT(user) {
  const tokenPayload = {
    name: user.name,
    id: user._id,
  };

  const secret = process.env.SECRET;
  return jwt.sign(tokenPayload, secret);
}

module.exports = { checkPassword, createJWT };
