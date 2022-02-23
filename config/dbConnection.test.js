const mongoose = require('mongoose');
const dbConnection = require('./dbConnection');

describe('Given the dbConnection function', () => {
  describe('When dbConnection is called', () => {
    afterAll(() => {
      mongoose.disconnect();
    });
    test('Then the connection should be truthy', async () => {
      const result = await dbConnection();
      expect(result).toBeTruthy();
      expect(result.connections[0]).toBeTruthy();
    });
  });
});
