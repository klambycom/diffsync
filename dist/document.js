"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// TODO Document is document or shadow

var Document = (function () {
  function Document() {
    _classCallCheck(this, Document);
  }

  _prototypeProperties(Document, null, {
    add: {
      value: function add() {},
      writable: true,
      configurable: true
    },
    remove: {
      value: function remove() {},
      writable: true,
      configurable: true
    },
    update: {
      value: function update() {},
      writable: true,
      configurable: true
    },
    patch: {
      value: function patch() {},
      writable: true,
      configurable: true
    },
    diff: {
      value: function diff(shadow) {},
      writable: true,
      configurable: true
    }
  });

  return Document;
})();

module.exports = Document;
// TODO Add to JSON to document
// TODO Remove JSON from document
// TODO Update all JSON
// TODO Needed? Probably!
// TODO Create diff between this and another document, JSON or text.