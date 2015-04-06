let socket = require('socket.io-client')('http://localhost:8000');

let titleElem = document.querySelector('#app h1');
let docElem = document.querySelector('#app .document');
let sendElem = document.querySelector('#app .send');

let diffsync = require('../index');
let doc = new diffsync.JSONDocument();

socket.on('connect', function () {
  let diffsyncClient = diffsync.client(socket, doc);

  diffsyncClient.on('update', data => {
    console.log('UPDATE', data);

    titleElem.innerHTML = data.name;
    docElem.value = JSON.stringify(data, null, 2);
  });

  sendElem.addEventListener('click', e => {
    let result = diffsyncClient.update(JSON.parse(docElem.value));
    if (!result) { console.log('Diff NOT sent'); }
  });
});
