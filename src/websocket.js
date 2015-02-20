// TODO Remove this file?

var listeners = [];

module.exports = {
  emit(name, object) {
    console.log(listeners);
  },

  connect(client) {
    listeners.push(client);
  }
};
