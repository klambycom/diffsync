/**
 * # StorageDriver
 */

/*! */

"use strict";

module.exports = {

  /**
   * Initialize a storage driver for Redis
   *
   * @method redis
   */

  redis: function redis() {
    return {
      _initStorage: function _initStorage() {},

      get: function get() {},

      set: function set() {}
    };
  }
};
/*options*/ /*data, patch*/