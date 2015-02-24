"use strict";

/**
 * # Client
 */

/*! */

var Document = require("./document");
var websocket = require("./websocket");

module.exports = function () {
  var doc = new Document();
  var shadow = new Document();

  console.log("DOCUMENT", doc);
  console.log("SHADOW", shadow);

  websocket.onPatch(function (patch) {
    doc.patch(patch);
    shadow.patch(patch);
  });

  var sendDiff = function () {
    var diff = doc.diff(shadow);
    websocket.emit("DIFF", diff);
  };

  return {

    /**
     * Update the whole document
     *
     * @method update
     * @param {Object} json Information about and instructions for the document
     */

    update: function update(json) {
      doc.update(json);
      sendDiff();
    },

    /**
     * Merge instructions
     *
     * @method merge
     * @param {Object} json Instructions for the document
     */

    merge: function merge(json) {
      doc.merge(json);
      sendDiff();
    }
  };
};