/**
 * # StorageDriver
 */

/*! */

module.exports = {

  /**
   * Initialize a storage driver for Redis
   *
   * @method redis
   */

  redis() {
    return {
      _initStorage(/*options*/) {
      },

      get() {
      },

      set(/*data, patch*/) {
      }
    };
  }
};
