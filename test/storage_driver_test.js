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

    it('should return Promise when "_initStorage" is called', function () {
      expect(sut._initStorage().constructor.name).toEqual('Promise');
    });

    it('should have a function called "get"', function () {
      expect(sut.get).toBeDefined();
    });

    it('should return Promise when "get" is called', function () {
      expect(sut.get().constructor.name).toEqual('Promise');
    });

    it('should have a function called "set"', function () {
      expect(sut.set).toBeDefined();
    });

    it('should return Promise when "set" is called', function () {
      expect(sut.set().constructor.name).toEqual('Promise');
    });
  });
});
