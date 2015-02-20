// TODO Remove this file?

var listeners = [];

module.exports = {
  emit(name, object) {
    listeners.forEach(fn => {
      fn(name, object);
    });
  },

  onPatch(fn) {
    listeners.push(fn);
  }
};
