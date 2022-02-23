/* eslint-disable no-underscore-dangle */
const request = require('supertest');
const mongoose = require('mongoose');
const dbConnection = require('../config/dbConnection');
const USERS = require('../__Mock__/users');
const User = require('../models/user.model');
const { app, appServer } = require('../app');

describe('Given the users route', () => {
  let initialCount;
  let initialId;

  beforeEach(async () => {
    await dbConnection();
    await User.deleteMany({});

    const response = await User.insertMany(USERS);
    initialCount = response.length;
    initialId = response[0]._id;
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await appServer.close();
  });
  describe('When the POST /api/users is attacked', () => {
    test('Then should return the users with one added', async () => {
      const newUser = {
        name: 'test',
        lastname: 'ortiz',
        email: 'aaa@mama.com',
        password: '11',
      };

      const response = await request(app).post('/api/users').send(newUser);
      expect(response.status).toBe(201);
    });
  });
  describe('When the GET /api/useres/:id is attacked', () => {
    test('Then it should return an only user', async () => {
      const response = await request(app).get(`/api/users/${initialId}`);
      expect(response.body.lastname).toBe('Rodri');
      expect(response.status).toBe(200);
    });
  });
  describe('When the GET /api/users/:id is attacked with a wrong ID', () => {
    test('Then should return an error', async () => {
      const response = await request(app).get('/api/users/123456');

      expect(response.status).toBe(500);
    });
  });
  describe('When the DELETE /api/users/:id is attacked', () => {
    test('Then it should delete the id asked', async () => {
      const response = await request(app).delete(`/api/users/${initialId}`);

      expect(response.status).toBe(202);
    });
  });
});
