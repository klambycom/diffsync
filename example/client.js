var { client } = require('../index');

var c = client();

c.update({
  detta: 'ar',
  bara: {
    ett: 'test'
  }
});

c.merge({ mer: 'ge' });

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
