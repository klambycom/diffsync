/**
 * # StorageDriver
 */

/*! */

/* global -Promise */
let Promise = require('promise');

module.exports = {

  /**
   * Initialize a storage driver for Redis
   *
   * @method redis
   */

  redis() {
    return {
      _initStorage(/*options*/) {
        return new Promise((resolve, reject) => {
          if (false) {
            reject({});
          } else {
            resolve({});
          }
        });
      },

      get() {
        return new Promise((resolve, reject) => {
          if (false) {
            reject({});
          } else {
            resolve({});
          }
        });
      },

      set(/*data, patch*/) {
        return new Promise((resolve, reject) => {
          if (false) {
            reject({});
          } else {
            resolve({});
          }
        });
      }
    };
  }
};
