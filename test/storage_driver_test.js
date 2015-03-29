var storageDriver = require('../dist/storage_driver.js');

describe('StorageDriver', function () {
  var redis;

  beforeEach(function () {
    redis = {
      hget: function (hash, key, callback) { console.log('hget'); callback(null, {}); },
      hgetall: function (hash, callback) { console.log('hgetall'); callback(null, {}); },
      hset: function (hash, key, value) {}
    };
    spyOn(redis, 'hget');
    spyOn(redis, 'hgetall');
    spyOn(redis, 'hset');

    storageDriver.create('hash1', redis);
  });

  it('should have create function', function () {
    expect(storageDriver.create).toBeDefined();
  });

  it('should have disconnect function', function () {
    expect(storageDriver.disconnect).toBeDefined();
  });

  describe('Get name', function () {
    it('should have getName function', function () {
      expect(storageDriver.getName).toBeDefined();
    });

    it('should use redis hget', function () {
      storageDriver.getName();
      expect(redis.hget).toHaveBeenCalled();
    });

    it('should return Promise when "getName" is called', function () {
      expect(storageDriver.getName().constructor.name).toEqual('Promise');
    });
  });

  describe('Set name', function () {
    it('should have setName function', function () {
      expect(storageDriver.setName).toBeDefined();
    });

    it('should use redis hset', function () {
      storageDriver.setName('test');
      expect(redis.hset).toHaveBeenCalled();
    });
  });

  describe('Get data', function () {
    it('should have getData function', function () {
      expect(storageDriver.getData).toBeDefined();
    });

    it('should use redis hget', function () {
      storageDriver.getData();
      expect(redis.hget).toHaveBeenCalled();
    });

    it('should return Promise when "getData" is called', function () {
      expect(storageDriver.getData().constructor.name).toEqual('Promise');
    });
  });

  describe('Set data', function () {
    it('should have setData function', function () {
      expect(storageDriver.setData).toBeDefined();
    });

    it('should use redis hset', function () {
      storageDriver.setData({ ett: 'test' });
      expect(redis.hset).toHaveBeenCalled();
    });
  });

  describe('Get JSON', function () {
    it('should have getJSON function', function () {
      expect(storageDriver.getJSON).toBeDefined();
    });

    it('should use redis hget', function () {
      storageDriver.getJSON();
      expect(redis.hgetall).toHaveBeenCalled();
    });

    it('should return Promise when "getJSON" is called', function () {
      expect(storageDriver.getJSON().constructor.name).toEqual('Promise');
    });
  });
});
