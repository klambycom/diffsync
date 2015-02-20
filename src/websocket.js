// TODO Remove this file?

var listeners = [];

module.exports = {
  emit(name, object) {
    listeners.forEach(fn => fn(object));
  },

  onPatch(fn) {
    listeners.push(fn);
  }
};
