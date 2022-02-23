const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const auth = require('./auth');

dotenv.config();

describe('Given the auth', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { params: {}, body: { beerId: '123' } };
    res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    next = jest.fn();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  describe('When the token is giving', () => {
    beforeEach(() => {
      req.get = jest.fn().mockReturnValue('Bearer Token');
      jwt.verify = jest.fn().mockReturnValue({ id: true });
    });

    test('Then is a valid token', () => {
      auth(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('When an invalid token is given', () => {
    beforeEach(() => {
      req.get = jest.fn().mockReturnValue('Bearer Token');
      jwt.verify = () => {
        throw new Error();
      };
    });
    test('Then the res.status err should be called', () => {
      auth(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
    });
  });
});
