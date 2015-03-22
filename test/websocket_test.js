var websocket = require('../dist/websocket.js');

describe('websocket', function () {
  var sut;

  beforeEach(function () {
    sut = websocket({ on: function () {} });
  });

  it('should have sendDiff method', function () {
    expect(sut.sendDiff).toBeDefined();
  });

  it('should have eventemitter object', function () {
    expect(sut.eventemitter).toBeDefined();
  });
});
