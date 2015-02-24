"use strict";

/**
 * # Client(socket)
 *
 * **Socket.io** *socket* 
 */

/*! */

var Document = require("./document");
var websocket = require("./websocket");

module.exports = function (socket) {
  var doc = new Document();
  var edits = websocket(socket, doc);

  console.log("DOCUMENT", doc);
  //console.log('SHADOW', shadow);

  socket.on("diff", function edits(data) {
    doc.patch(data);
    //shadow.patch(data);
  });

  return {

    /**
     * Update the whole document
     *
     * @method update
     * @param {Object} json Information about and instructions for the document
     */

    update: function update(json) {
      doc.update(json);
      edits.sendDiff();
    },

    /**
     * Merge instructions
     *
     * @method merge
     * @param {Object} json Instructions for the document
     */

    merge: function merge(json) {
      doc.merge(json);
      edits.sendDiff();
    }
  };
};