const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { checkPassword, createJWT } = require('./auth.help');

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Given the auth helper', () => {
  describe('When a password is given with a good value', () => {
    test('Then the checkPassword should be called', async () => {
      const password = '';
      const user = { password: '1234' };
      await checkPassword(password, user);
      expect(bcrypt.compare).toHaveBeenCalled();
    });
    describe('When a passwrd is given with the wrong passwrd', () => {
      test('Then the p', async () => {
        const password = '';
        const user = { password: '' };
        const result = await checkPassword(password, user);
        expect(result).toBe(false);
      });
    });
    describe('When every data is given', () => {
      test('Then create token should be called', () => {
        const user = { name: '', cart: '', id: '' };
        createJWT(user);
        expect(jwt.sign).toHaveBeenCalled();
      });
    });
  });
});
