const { checkPassword, createJWT } = require('../helper/auth.help');
const User = require('../models/user.model');

const logUser = require('./login.controller');

jest.mock('../models/user.model');
jest.mock('../helper/auth.help');

describe('Given the login controller', () => {
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
  describe('When a user try to log (logUser is triggered)', () => {
    describe('And user and passwd are valid (promise is resolved)', () => {
      beforeEach(() => {
        User.findOne.mockResolvedValue({});
        checkPassword.mockReturnValue(true);
        createJWT.mockImplementation(() => 'token');
        req.body = {};
      });
      test('Then user should be logged', async () => {
        await logUser(req, res, next);

        expect(User.findOne).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalled();
      });
    });
  });
  describe('And user and passwd are not valid (promise is resolved)', () => {
    beforeEach(() => {
      User.findOne.mockResolvedValue({});
      checkPassword.mockResolvedValue(false);
      req.body = {};
    });
    test('Then user should not be logged', async () => {
      await logUser(req, res, next);

      expect(User.findOne).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });
  });
  describe('And user is not valid (promise is resolved)', () => {
    beforeEach(() => {
      User.findOne.mockRejectedValue({});
      checkPassword.mockResolvedValue(false);
      req.body = {};
    });
    test('Then user should not be logged', async () => {
      await logUser(req, res, next);

      expect(User.findOne).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});
