/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');
const { createJWT } = require('../helper/auth.help');
const Cart = require('../models/cart.model');
const User = require('../models/user.model');

async function addUser(req, res, next) {
  const user = req.body;

  if (!user.name || !user.lastname || !user.email || !user.password) {
    next(new Error('Data incompleted'));
  }

  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user.password, salt);
  try {
    const newUser = await User.create(user);

    const newCart = {
      balloons: [],
      user: newUser._id,
    };

    const userCart = await Cart.create(newCart);

    newUser.cart = userCart._id;
    newUser.save();

    const jwToken = createJWT(newUser);

    res.status(201).json({
      newUser,
      token: jwToken,
    });
  } catch (err) {
    next(err);
  }
}

async function getUserById(req, res, next) {
  if (!req.params.id) {
    next(new Error('Invalid Id'));
  }
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  if (!req.params.id) {
    next(new Error('Invalid Id'));
  }
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    await Cart.deleteMany({ user: req.params.id });
    res.status(202).json(deletedUser);
  } catch (err) {
    next(err);
  }
}

module.exports = { addUser, getUserById, deleteUser };
