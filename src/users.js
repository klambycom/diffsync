let clients = [];

// Source: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
let _createUUID = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8); // jshint ignore:line
    return v.toString(16);
  });
};

// Send message to one specific client
let _send = (user) => (data, type = 'message') => {
  if (Object.keys(data).length > 0) { user.sendUTF(JSON.stringify({ type, data })); }
};

// Add user and create doc and shadow
// Return user if user is valid
let create = function (websocket) {
  let user = { uuid: _createUUID(), send: _send(websocket), websocket };
  clients.push(user);
  return user;
};

// Remove user
let remove = function (user) {
  clients = clients.filter(x => user.uuid !== x.uuid);
};

// Array containing all users
let all = function () { return JSON.parse(JSON.stringify(clients)); };

let forEach = function (currentValue, index, array) {
  clients.forEach(currentValue, index, array);
};

module.exports = { create, remove, all, forEach };
