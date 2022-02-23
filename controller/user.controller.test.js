const User = require('../models/user.model');
const Cart = require('../models/cart.model');
const { addUser, getUserById, deleteUser } = require('./user.controller');

jest.mock('../models/user.model');
jest.mock('../models/cart.model');

describe('Given the users controller', () => {
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = { params: {} };
    res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    next = jest.fn();
  });
  describe('When the addUser is called', () => {
    test('Then user.create, cart.create and res.json should be called', async () => {
      req.body = {
        name: 'test',
        lastname: 'test',
        email: 'test',
        password: 'test',
      };
      User.create.mockResolvedValue({
        save: jest.fn(),
      });
      Cart.create.mockResolvedValue({
        save: jest.fn(),
      });

      await addUser(req, res, next);

      expect(User.create).toHaveBeenCalled();
      expect(Cart.create).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });
  });
  describe('When the addUser is called with no name', () => {
    test('Then next error should be called', async () => {
      req.body = {
        lastname: 'test',
        email: 'test',
        password: 'test',
      };
      User.create.mockRejectedValue();

      await addUser(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
  describe('When the addUser is called with a rejected value', () => {
    test('Then res.next should be called', async () => {
      req.body = {
        name: 'test',
        lastname: 'test',
        email: 'test',
        password: 'test',
      };
      User.create.mockRejectedValue({});

      await addUser(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
  describe('When the getUserById is called', () => {
    test('Then user.findbyId should have been called', async () => {
      User.findById.mockResolvedValue({});

      await getUserById(req, res, next);

      expect(User.findById).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });
  });
  describe('When the getUserById is called with a rejected value', () => {
    test('Then res.next should be called', async () => {
      User.findById.mockRejectedValue();

      await getUserById(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
  describe('When the deleteUser is called', () => {
    test('Then User.findByIdAndDelete should be called', async () => {
      User.findByIdAndDelete.mockResolvedValue({});
      Cart.deleteMany.mockResolvedValue({});

      await deleteUser(req, res, next);

      expect(User.findByIdAndDelete).toHaveBeenCalled();
      expect(Cart.deleteMany).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalled();
    });
  });
  describe('When the deleteUser is called wih a rejected value', () => {
    test('Then res.next should have been called', async () => {
      User.findByIdAndDelete.mockRejectedValue();

      await deleteUser(req, res, next);

      expect(User.findByIdAndDelete).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});
