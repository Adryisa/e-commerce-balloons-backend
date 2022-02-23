/* eslint-disable no-underscore-dangle */
const request = require('supertest');
const mongoose = require('mongoose');
const dbConnection = require('../config/dbConnection');
const Balloon = require('../models/balloon.model');
const BALLOONS = require('../__Mock__/balloons');
const { app, appServer } = require('../app');

describe('Given the balloon routes', () => {
  let initialCount;
  let initialId;

  beforeEach(async () => {
    await dbConnection();
    await Balloon.deleteMany({});

    const response = await Balloon.insertMany(BALLOONS);
    initialCount = response.length;
    initialId = response[0]._id;
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await appServer.close();
  });
  describe('When the GET /api/balloons is atacked', () => {
    test('Then should return all balloons', async () => {
      const response = await request(app).get('/api/balloons');
      expect(response.body).toHaveLength(initialCount);
      expect(response.status).toBe(200);
    });
  });
  describe('When the GET /api/balloons/:id is atacked', () => {
    test('Then should return the product', async () => {
      const response = await request(app).get(`/api/balloons/${initialId}`);
      expect(response.body.color).toBe('white');
      expect(response.status).toBe(200);
    });
  });
  describe('When the POST /api/balloons is atacked', () => {
    test('Then should return the products', async () => {
      const newBalloon = {
        model_num: '#002',
        type: 'Shiny',
        type_img_url:
          'https://res.cloudinary.com/dcy6vi33h/image/upload/v1638197358/types_img/standard_types_odnmzn.jpg',
        size: '13cm',
        color: 'black',
        img_url:
          'https://res.cloudinary.com/dcy6vi33h/image/upload/v1638197378/standard/001_white_hikwgb.jpg',
        price: 10,
        package: '100 und',
      };

      const response = await request(app)
        .post('/api/balloons')
        .send(newBalloon);

      expect(response.body.color).toBe('black');
      expect(response.status).toBe(201);
    });
  });
});
