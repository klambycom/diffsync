"use strict";

module.exports = function (id) {
  return function (text) {
    var error = arguments[1] === undefined ? false : arguments[1];

    var message = "" + new Date() + " " + text + " (" + id + ")";

    if (error) {
      console.error(message);
    } else {
      console.log(message);
    }
  };
};