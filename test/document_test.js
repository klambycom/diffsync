var JSONDocument = require('../dist/document.js');

describe('JSONDocument', function () {
  var sut;

  beforeEach(function () {
    sut = new JSONDocument({ test: 'pass', type: 'audio', name: 'testfile' });
  });

  it('should take JSON as param to the constructor', function () {
    expect(sut.json).toEqual({ test: 'pass', type: 'audio', name: 'testfile' });
  });

  it('should default to empty object', function () {
    sut = new JSONDocument();
    expect(sut.json).toEqual({});
  });

  describe('update', function () {
    it('should have a update method', function () {
      expect(sut.update).toBeDefined();
    });

    it('should update the JSON', function () {
      var json = { test: 'pass', type: 'audio', name: 'file1' };
      sut.update(json);
      expect(sut.json).toEqual(json);
    });
  });

  describe('merge', function () {
    it('should have a merge method', function () {
      expect(sut.merge).toBeDefined();
    });

    it('should partial update the JSON', function () {
      sut.merge({ type: 'image' });
      expect(sut.json).toEqual({ test: 'pass', type: 'image', name: 'testfile' });
    });
  });

  describe('patch', function () {
    it('should have a patch method', function () {
      expect(sut.patch).toBeDefined();
    });

    it('should update the JSON', function () {
      sut.patch({ test: ['pass', 0, 0] });
      expect(sut.json).toEqual({ type: 'audio', name: 'testfile' });
    });

    it('should not update the JSON if patch is undefined', function () {
      sut.patch(undefined);
      expect(sut.json).toEqual({ test: 'pass', type: 'audio', name: 'testfile' });
    });

    it('should not update the JSON if patch is null', function () {
      sut.patch(null);
      expect(sut.json).toEqual({ test: 'pass', type: 'audio', name: 'testfile' });
    });
  });

  describe('diff', function () {
    it('should have a diff method', function () {
      expect(sut.diff).toBeDefined();
    });

    it('should return a diff between this document and shadow', function () {
      var shadow = new JSONDocument({ test: 'pass', type: 'image', name: 'testfile' });
      expect(sut.diff(shadow)).toEqual({ type: ['image', 'audio'] });
    });
  });
});
