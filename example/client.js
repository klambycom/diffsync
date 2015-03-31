let socket = require('socket.io-client')('http://localhost:8000');

socket.on('connect', function () {
  let titleElem = document.querySelector('#app h1');
  let docElem = document.querySelector('#app .document');
  let sendElem = document.querySelector('#app .send');

  let diffsync = require('../index').client(socket);

  diffsync.on('patch', data => {
    console.log('PATCH', data);
  });

  diffsync.on('update', data => {
    console.log('UPDATE', data);

    titleElem.innerHTML = data.name;
    docElem.value = JSON.stringify(data, null, 2);
  });

  sendElem.addEventListener('click', e => {
    let result = diffsync.update(JSON.parse(docElem.value));

    if (result) {
      console.log('Diff sent');
    } else {
      console.log('Diff NOT sent');
    }
  });
});
