var { Document, client, server, websocket } = require('../index');

websocket.connect('ett');
websocket.connect('tva');
websocket.emit();
