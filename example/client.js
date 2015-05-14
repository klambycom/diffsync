/*
let diffpatch = require('jsondiffpatch').create();

let file1 = {
  'name': 'audiofile1',
  'data': {
    'f1': {
      'type': 'file',
      'file': '/alien_phaser.wav',
      'start': 0,
      'end': 1.399
    },
    'f2': {
      'type': 'file',
      'file': '/car.wav',
      'start': 1.5,
      'end': 2.7935833333
    },
    'f3': {
      'type': 'file',
      'file': '/surround.wav',
      'start': 10,
      'end': 25.9999,
      'rate': 3
    }
  }
};

let shadow = JSON.parse(JSON.stringify(file1));
let file2 = JSON.parse(JSON.stringify(file1));
let file3 = JSON.parse(JSON.stringify(file1));

file1.data['f1'].type = 'filen';
file2.data['f2'].file = '/cat.mp3';
file2.data['f3'].type = 'drums';

let diff1 = diffpatch.diff(shadow, file1);
diffpatch.patch(shadow, diff1);
diffpatch.patch(file2, diff1);
let diff2 = diffpatch.diff(shadow, file2);
console.log('diff1', diff1);
console.log('diff2', diff2);

diffpatch.patch(file3, diff1);
diffpatch.patch(file3, diff2);
console.log(file3);
*/

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
