let Document = require('./document');
let websocket = require('./websocket');

module.exports = function () {
  let doc = new Document();
  let shadow = new Document();

  console.log('DOCUMENT', doc);
  console.log('SHADOW', shadow);

  websocket.onPatch((name, data) => {
    //doc.patch(patch);
    //shadow.patch(patch);
    console.log(name, data);
  });

  let sendDiff = function () {
    let diff = doc.diff(shadow);
    websocket.emit('DIFF', diff);
  };

  return {
    update(json) {
      doc.update(json);
      sendDiff();
    },

    merge(json) {
      doc.merge(json);
      sendDiff();
    }
  };
};
