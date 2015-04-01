//let StorageDriver = require('../storage_driver.js');
//
//let storage = new StorageDriver('hash1');
///*
//storage.setName('fil1');
//storage.setData({
//  'ett': 1,
//  'tva': 'two',
//  'tre': [1, 1, 1]
//});
//*/
//storage
//  .getName()
//  .then(value => console.log(value), reason => console.log(reason));
//
//storage
//  .getData()
//  .then(value => console.log(value), reason => console.log(reason));
//
//storage
//  .getJSON()
//  .then(value => console.log(value), reason => console.log(reason));

let app = require('http').createServer(handler);
let io = require('socket.io')(app);
let fs = require('fs');
let { server } = require('../../index');

app.listen(8000);
console.log('Server started, on port 8000.');

function handler(req, res) {
  console.log(new Date(), req.url);

  let file = '/index.html';
  if (req.url !== '/') {
    file = req.url;
  }

  fs.readFile(__dirname + file, function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading client.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  let diffsync = server('hash1', socket);

  diffsync.on('update', data => console.log('UPDATE', data));

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  console.log('Socket.io connected.');
});
