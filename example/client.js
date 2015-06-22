let client = require('../dist/websocket.js');

client.addListener('connected', e => {
  console.log('Connected to the server!');
});

client.addListener('ready', e => {
  console.log('READY', e.data);
});

client.addListener('message', e => {
  console.log('MESSAGE', e.data);
});

client.addListener('error', error => {
  console.log('ERROR', error);
});

client.settings.url = 'ws://127.0.0.1:8888';
client.connect();



/*
let io = require('socket.io-client');
let socket = io.connect('http://localhost:8000');

let titleElem = document.querySelector('#app h1');
let docElem = document.querySelector('#app .document');
let sendElem = document.querySelector('#app .send');

let onoffElem = document.querySelector('#app .onoff');
let isOn = true;

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


  // Disconnect and Reconnect
  onoffElem.innerText = 'Disconnect (online)';
  onoffElem.addEventListener('click', e => {
    if (isOn) {
      diffsyncClient.offline();
      isOn = false;
    } else {
      diffsyncClient.online();
      isOn = true;
    }

    onoffElem.innerText = isOn ? 'Disconnect (online)' : 'Connect (offline)';
  });

  socket.on('disconnect', () => {
    console.log('Disconnected');
  });
});
*/
