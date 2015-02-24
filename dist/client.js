"use strict";

/**
 * # Client(socket)
 *
 * **Socket.io** *socket* 
 */

/*! */

var Document = require("./document");
//let websocket = require('./websocket');

module.exports = function (socket) {
  var doc = new Document();
  var shadow = new Document();

  console.log("DOCUMENT", doc);
  console.log("SHADOW", shadow);

  /*
  websocket.onPatch(patch => {
    doc.patch(patch);
    shadow.patch(patch);
  });
  */


  socket.on("diff", function (data) {
    console.log("diff");
    //doc.patch(data);
    //shadow.patch(data);
  });

  var sendDiff = function () {
    var diff = doc.diff(shadow);
    socket.emit("diff", diff);
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