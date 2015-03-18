/*
var { client } = require('../index');
let socket = require('socket.io-client')('http://localhost:8000');

socket.on('connect', function () {
  var kollab = client(socket);

  kollab.update({
    detta: 'ar',
    bara: {
      ett: 'test'
    }
  });

  kollab.merge({ mer: 'ge' });
});
*/

let doc = {
  title: 'The title',
  data: {
    type: 'file',
    changes: [
    ]
  }
};

let titleElem = document.querySelector('#app h1');
let docElem = document.querySelector('#app .document');
let sendElem = document.querySelector('#app .send');

titleElem.innerHTML = doc.title;
docElem.value = JSON.stringify(doc);

sendElem.addEventListener('click', e => {
  console.log(JSON.parse(docElem.value));
});
