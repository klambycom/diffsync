var Doc = require('../dist/document.js');

describe('Document', function () {
  var sut;

  beforeEach(function () {
    sut = new Doc({ test: 'pass', type: 'audio', name: 'testfile' });
  });

  it('should take JSON as param to the constructor', function () {
    expect(sut.json_data).toEqual({ test: 'pass', type: 'audio', name: 'testfile' });
  });

  it('should default to empty object', function () {
    sut = new Doc();
    expect(sut.json_data).toEqual({});
  });

  it('should copy the object', function () {
    var json = { test: 'pass' };
    sut = new Doc(json);
    json.test = 'fail';
    expect(sut.json_data).toEqual({ test: 'pass' });
  });

  describe('update', function () {
    it('should have a update method', function () {
      expect(sut.update).toBeDefined();
    });

    it('should update the JSON', function () {
      var json = { test: 'pass', type: 'audio', name: 'file1' };
      sut.update(json);
      expect(sut.json_data).toEqual(json);
    });

    it('should copy the object', function () {
      var json = { test: 'pass' };
      sut.update(json);
      json.test = 'fail';
      expect(sut.json_data).toEqual({ test: 'pass' });
    });
  });

  describe('merge', function () {
    it('should have a merge method', function () {
      expect(sut.merge).toBeDefined();
    });

    it('should partial update the JSON', function () {
      sut.merge({ type: 'image' });
      expect(sut.json_data)
        .toEqual({ test: 'pass', type: 'image', name: 'testfile' });
    });
  });

  describe('patch', function () {
    it('should have a patch method', function () {
      expect(sut.patch).toBeDefined();
    });

    it('should update the JSON', function () {
      sut.patch({ test: ['pass', 0, 0] });
      expect(sut.json_data).toEqual({ type: 'audio', name: 'testfile' });
    });

    it('should not update the JSON if patch is undefined', function () {
      sut.patch(undefined);
      expect(sut.json_data)
        .toEqual({ test: 'pass', type: 'audio', name: 'testfile' });
    });

    it('should not update the JSON if patch is null', function () {
      sut.patch(null);
      expect(sut.json_data)
        .toEqual({ test: 'pass', type: 'audio', name: 'testfile' });
    });
  });

  describe('diff', function () {
    it('should have a diff method', function () {
      expect(sut.diff).toBeDefined();
    });

    it('should return a diff between this document and shadow', function () {
      var shadow = new Doc({ test: 'pass', type: 'image', name: 'testfile' });
      expect(sut.diff(shadow)).toEqual({ type: ['image', 'audio'] });
    });
  });

  describe('json', function () {
    it('should have a json method', function () {
      expect(sut.json).toBeDefined();
    });

    it('should return the json', function () {
      expect(sut.json()).toEqual({ test: 'pass', type: 'audio', name: 'testfile' });
    });

    it('should copy the object', function () {
      sut = new Doc({ test: 'pass' });
      var json = sut.json();
      json.test = 'fail';
      expect(sut.json_data).toEqual({ test: 'pass' });
    });
  });

  describe('isEmpty', function () {
    it('should be defined', function () {
      expect(sut.isEmpty).toBeDefined();
    });

    it('should return true if document contains json', function () {
      expect(sut.isEmpty()).toBe(false);
    });

    it('should return false if json is empty', function () {
      sut = new Doc();
      expect(sut.isEmpty()).toBe(true);
    });
  });
});
