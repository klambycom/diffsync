var storageDriver = require('../dist/storage_driver.js');
var Doc = require('../dist/document.js');

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

  describe('Set data from document', function () {
    beforeEach(function () {
      sut.json_data = { name: 'Filname', data: {} };
      spyOn(sut, 'setName');
      spyOn(sut, 'setData');
    });

    it('should have function "setFromDocument"', function () {
      expect(sut.setFromDocument).toBeDefined();
    });

    it('should save name', function () {
      sut.setFromDocument(new Doc({ name: 'Fil1', data: {} }));
      expect(sut.setName).toHaveBeenCalledWith('Fil1');
    });

    it('should only save name if name is changed', function () {
      sut.setFromDocument(new Doc({ name: 'Filname', data: {} }));
      expect(sut.setName).not.toHaveBeenCalled();
    });

    it('should save data', function () {
      sut.setFromDocument(new Doc({ name: 'Fil1', data: { ett: 1 } }));
      expect(sut.setData).toHaveBeenCalledWith({ ett: 1 });
    });

    it('should only save data if data is not empty', function () {
      sut.setFromDocument(new Doc({ name: 'Fil1', data: {} }));
      expect(sut.setData).not.toHaveBeenCalled();
    });
  });
});
