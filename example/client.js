let socket = require('socket.io-client')('http://localhost:8000');

socket.on('connect', function () {
  let diffsync = require('../index').client(socket);
  let titleElem = document.querySelector('#app h1');
  let docElem = document.querySelector('#app .document');
  let sendElem = document.querySelector('#app .send');

  let doc = {
    title: 'The title',
    data: {
      type: 'file',
      changes: [
      ]
    }
  };

  diffsync.update(doc);

  titleElem.innerHTML = doc.title;
  docElem.value = JSON.stringify(doc);

  sendElem.addEventListener('click', e => {
    console.log(JSON.parse(docElem.value));
  });
});
