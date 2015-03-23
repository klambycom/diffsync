var storageDriver = require('../dist/storage_driver.js');

describe('StorageDriver', function () {
  it('should have redis driver', function () {
    expect(storageDriver.redis).toBeDefined();
  });

  describe('Redis', function () {
    var sut;

    beforeEach(function () {
      sut = storageDriver.redis();
    });

    it('should have a function called "_initStorage"', function () {
      expect(sut._initStorage).toBeDefined();
    });

    it('should have a function called "get"', function () {
      expect(sut.get).toBeDefined();
    });

    it('should have a function called "set"', function () {
      expect(sut.set).toBeDefined();
    });
  });
});
