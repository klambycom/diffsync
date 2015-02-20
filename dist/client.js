"use strict";

var Document = require("./document");
var websocket = require("./websocket");

module.exports = function () {
  var doc = new Document();
  var shadow = new Document();

  console.log("DOCUMENT", doc);
  console.log("SHADOW", shadow);

  websocket.onPatch(function (name, data) {
    //doc.patch(patch);
    //shadow.patch(patch);
    console.log(name, data);
  });

  var sendDiff = function () {
    var diff = doc.diff(shadow);
    websocket.emit("DIFF", diff);
  };

  return {
    update: function update(json) {
      doc.update(json);
      sendDiff();
    },

    merge: function merge(json) {
      doc.merge(json);
      sendDiff();
    }
  };
};