const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  balloons: {
    type: [
      {
        balloonId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Balloon',
        },
        amount: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
    required: true,
    default: [],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
