var websocket = require('../dist/websocket.js');

describe('websocket', function () {
  it('should have eventemitter object', function () {
    var sut = websocket({ on: function () {} });
    expect(sut.eventemitter).toBeDefined();
  });

  describe('sendDiff', function () {
    var sut, socket, doc, eventemitter, diff;

    beforeEach(function () {
      diff = { test: ['pass', 0, 0] };

      // Socket.io
      socket = {
        on: function () {},
        emit: function () {}
      };
      spyOn(socket, 'on');
      spyOn(socket, 'emit');

      // JSONDocument
      doc = { diff: function () {} };
      spyOn(doc, 'diff').and.returnValue(diff);

      // EventEmittor
      eventemitter = {
        on: function () {},
        emit: function () {}
      };
      spyOn(eventemitter, 'on');
      spyOn(eventemitter, 'emit');

      sut = websocket(socket, doc, eventemitter);
    });

    it('should have sendDiff method', function () {
      expect(sut.sendDiff).toBeDefined();
    });

    it('should create a diff', function () {
      sut.sendDiff();
      expect(doc.diff).toHaveBeenCalled();
    });

    //it('should patch the shadow');

    it('should send diff using socket', function () {
      sut.sendDiff();
      expect(socket.emit).toHaveBeenCalledWith('diff', diff);
    });

    it('should send diff using eventemitter', function () {
      sut.sendDiff();
      expect(eventemitter.emit).toHaveBeenCalledWith('diff', diff);
    });
  });
});
