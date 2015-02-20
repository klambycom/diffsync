var { Document, client, server, websocket } = require('../index');

var doc = new Document({ foo: 'bar' });
var shadow = new Document({ foo: 'bar' });

doc.update({
  detta: 'ar',
  bara: {
    ett: 'test'
  }
});
console.log(doc);

doc.merge({ mer: 'ge' });
console.log(doc);

websocket.connect('ett');
websocket.connect('tva');
websocket.emit();
