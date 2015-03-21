var client = require('../dist/client.js');

describe('Client', function () {
  var sut;

  beforeEach(function () {
    sut = client({ on: function () {} });
  });

  it('should have a function called "update"', function () {
    expect(sut.update).toBeDefined();
  });

  it('should have a function called "merge"', function () {
    expect(sut.merge).toBeDefined();
  });

  it('should have a function called "on"', function () {
    expect(sut.on).toBeDefined();
  });
});
