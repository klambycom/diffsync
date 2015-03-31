var server = require('../dist/server.js');

describe('Server', function () {
  var sut;

  beforeEach(function () {
    var socket = {
      on: function () {},
      join: function () {}
    };

    sut = server('room1', socket, {});
  });

  it('should have a function called "on"', function () {
    expect(sut.on).toBeDefined();
  });
});
