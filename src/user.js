// TODO Rename user.js to users.js!

let clients = [];

// Source: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
let _createUUID = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
};

// Add user and create doc and shadow
// Return user if user is valid
let create = function (websocket) {
  let user = { uuid: _createUUID(), websocket };
  clients.push(user);
  return user;
};

// Remove user
let remove = function (user) {
  clients = clients.filter(x => user.uuid !== x.uuid);
};

// Array containing all users
// TODO Create copy of clients?
// TODO Remove?
let all = function () { return clients; };

let forEach = function (currentValue, index, array) {
  clients.forEach(currentValue, index, array);
};

module.exports = { create, remove, all, forEach };
