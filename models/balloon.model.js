const mongoose = require('mongoose');

const balloonSchema = new mongoose.Schema({
  model_num: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  type_img_url: {
    type: String,
    required: false,
  },
  size: {
    type: String,
    enum: ['13cm', '26cm', '30cm', '48cm', '80cm', '100cm'],
    default: '13cm',
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  img_url: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  package: {
    type: String,
    enum: ['50 und', '100 und', '150 und'],
    default: '50und',
    required: true,
  },
});

const Balloon = mongoose.model('Balloon', balloonSchema);

module.exports = Balloon;
