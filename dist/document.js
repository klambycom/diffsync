"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// TODO Document is document or shadow

var Document = (function () {
  function Document() {
    var json = arguments[0] === undefined ? {} : arguments[0];
    _classCallCheck(this, Document);

    this.json = json;
  }

  _prototypeProperties(Document, null, {
    update: {
      value: function update() {
        var json = arguments[0] === undefined ? {} : arguments[0];
        this.json = json;
      },
      writable: true,
      configurable: true
    },
    merge: {
      value: function merge() {
        var json = arguments[0] === undefined ? {} : arguments[0];
        for (var attr in json) {
          this.json[attr] = json[attr];
        }
      },
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
// TODO Needed? Probably!
// TODO Create diff between this and another document, JSON or text.