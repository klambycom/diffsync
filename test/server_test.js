var server = require('../dist/server.js');

describe('Server', function () {
  var sut;

  beforeEach(function () {
    sut = server({ on: function () {} }, {});
  });

  it('should have a function called "on"', function () {
    expect(sut.on).toBeDefined();
  });
});
