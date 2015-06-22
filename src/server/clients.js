let Doc = require('../document');
let clients = [];

// Source: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
let _createUUID = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8); // jshint ignore:line
    return v.toString(16);
  });
};

// Send message to one specific client
let _send = (client) => (data, type = 'message') => {
  if (Object.keys(data).length > 0) { client.sendUTF(JSON.stringify({ type, data })); }
};

// Add client and create doc and shadow
// Return client if client is valid
let create = function (websocket) {
  let client = {
    uuid: _createUUID(),
    send: _send(websocket),
    // TODO Update document to latest!
    shadow: new Doc(),
    websocket
  };

  clients.push(client);
  return client;
};

// Remove client
let remove = function (client) {
  clients = clients.filter(x => client.uuid !== x.uuid);
};

// Array containing all users
let all = function () { return JSON.parse(JSON.stringify(clients)); };

let forEach = function (currentValue, index, array) {
  clients.forEach(currentValue, index, array);
};

module.exports = { create, remove, all, forEach };
