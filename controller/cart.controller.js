/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const Cart = require('../models/cart.model');
const Balloon = require('../models/balloon.model');

async function getCartById(req, res, next) {
  try {
    const cartId = req.params.id;

    const cart = await Cart.findById(cartId).populate({
      path: 'balloons',
      populate: {
        path: 'balloonId',
        select: [
          'model_num',
          'type',
          'size',
          'color',
          'img_url',
          'price',
          'package',
        ],
      },
    });
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
}

async function addBalloonToCart(req, res, next) {
  try {
    const { balloonId, cartId } = req.params;

    const balloon = await Balloon.findById(balloonId);
    const cart = await Cart.findById(cartId);

    const balloonExits = cart.balloons.some(
      (item) => item.balloonId.toString() === balloon._id.toString()
    );

    if (balloonExits) {
      cart.balloons.forEach((item) => {
        if (item.balloonId.toString() === balloon._id.toString()) {
          item.amount += 1;
        }
      });
    } else {
      cart.balloons = [...cart.balloons, { balloonId: balloon._id, amount: 1 }];
    }

    await cart.save();

    res.status(201).json(cart);
  } catch (err) {
    next(err);
  }
}

async function updateBalloonAmountCart(req, res, next) {
  try {
    const { balloonId, cartId } = req.params;

    const balloon = await Balloon.findById(balloonId);
    const cart = await Cart.findById(cartId);

    cart.balloons = cart.balloons.map((item) => {
      if (item.balloonId.toString() === balloon._id.toString()) {
        item.amount += Number(req.body.diff);

        return item;
      }
      return item;
    });

    await cart.save();

    const finalCart = await Cart.findById(cartId).populate({
      path: 'balloons',
      populate: {
        path: 'balloonId',
        select: [
          'model_num',
          'type',
          'size',
          'color',
          'img_url',
          'price',
          'package',
        ],
      },
    });

    res.status(200).json(finalCart);
  } catch (err) {
    next(err);
  }
}

async function deleteBalloonCart(req, res, next) {
  try {
    const { balloonId, cartId } = req.params;

    const balloon = await Balloon.findById(balloonId);
    const cart = await Cart.findById(cartId);

    cart.balloons = cart.balloons.filter(
      (item) => item.balloonId.toString() !== balloon._id.toString()
    );

    await cart.save();

    const finalCart = await Cart.findById(cartId).populate({
      path: 'balloons',
      populate: {
        path: 'balloonId',
        select: [
          'model_num',
          'type',
          'size',
          'color',
          'img_url',
          'price',
          'package',
        ],
      },
    });
    res.status(204).json(finalCart);
  } catch (err) {
    next(err);
  }
}

async function buyCart(req, res, next) {
  try {
    const cartId = req.params.id;

    const cart = await Cart.findById(cartId);

    cart.balloons = [];

    cart.save();

    res.status(201).json(cart);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getCartById,
  addBalloonToCart,
  updateBalloonAmountCart,
  deleteBalloonCart,
  buyCart
};
