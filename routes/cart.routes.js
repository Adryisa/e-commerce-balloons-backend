const express = require('express');
const {
  getCartById,
  addBalloonToCart,
  deleteBalloonCart,
  updateBalloonAmountCart,
  buyCart,
} = require('../controller/cart.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/:cartId/balloon/:balloonId')
  .post(auth, addBalloonToCart)
  .patch(auth, updateBalloonAmountCart)
  .delete(auth, deleteBalloonCart);

router.route('/:id').get(auth, getCartById).patch(auth, buyCart);
module.exports = router;
