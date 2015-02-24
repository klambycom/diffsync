var { client } = require('../index');
let socket = require('socket.io-client')('http://localhost:8000');

socket.on('connect', function () {
  var kollab = client(socket);

  kollab.update({
    detta: 'ar',
    bara: {
      ett: 'test'
    }
  });

  kollab.merge({ mer: 'ge' });
});

/*
var doc = new Document({ foo: 'bar' });
var shadow = new Document({ foo: 'bar' });

doc.update();
console.log(doc);

doc.merge();
console.log(doc);

websocket.connect('ett');
websocket.connect('tva');
websocket.emit();
*/
