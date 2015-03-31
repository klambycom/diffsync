var storageDriver = require('../dist/storage_driver.js');

describe('StorageDriver', function () {
  var sut, redis;

  beforeEach(function () {
    redis = {
      hget: function (hash, key, callback) { callback(null, {}); },
      hgetall: function (hash, callback) { callback(null, {}); },
      hset: function (hash, key, value) {}
    };
    spyOn(redis, 'hget');
    spyOn(redis, 'hgetall');
    spyOn(redis, 'hset');

    sut = storageDriver('hash1', redis);
  });

  it('should have disconnect function', function () {
    expect(sut.disconnect).toBeDefined();
  });

  describe('Get name', function () {
    it('should have getName function', function () {
      expect(sut.getName).toBeDefined();
    });

    it('should use redis hget', function () {
      sut.getName();
      expect(redis.hget).toHaveBeenCalled();
    });

    it('should return Promise when "getName" is called', function () {
      expect(sut.getName().constructor.name).toEqual('Promise');
    });
  });

  describe('Set name', function () {
    it('should have setName function', function () {
      expect(sut.setName).toBeDefined();
    });

    it('should use redis hset', function () {
      sut.setName('test');
      expect(redis.hset).toHaveBeenCalled();
    });
  });

  describe('Get data', function () {
    it('should have getData function', function () {
      expect(sut.getData).toBeDefined();
    });

    it('should use redis hget', function () {
      sut.getData();
      expect(redis.hget).toHaveBeenCalled();
    });

    it('should return Promise when "getData" is called', function () {
      expect(sut.getData().constructor.name).toEqual('Promise');
    });
  });

  describe('Set data', function () {
    it('should have setData function', function () {
      expect(sut.setData).toBeDefined();
    });

    it('should use redis hset', function () {
      sut.setData({ ett: 'test' });
      expect(redis.hset).toHaveBeenCalled();
    });
  });

  describe('Get JSON', function () {
    it('should have getJSON function', function () {
      expect(sut.getJSON).toBeDefined();
    });

    it('should use redis hget', function () {
      sut.getJSON();
      expect(redis.hgetall).toHaveBeenCalled();
    });

    it('should return Promise when "getJSON" is called', function () {
      expect(sut.getJSON().constructor.name).toEqual('Promise');
    });
  });
});
