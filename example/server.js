let StorageDriver = require('../storage_driver.js');

let storage = new StorageDriver('hash1');
/*
storage.setName('fil1');
storage.setData({
  'ett': 1,
  'tva': 'two',
  'tre': [1, 1, 1]
});
*/
storage
  .getName()
  .then(value => console.log(value), reason => console.log(reason));

storage
  .getData()
  .then(value => console.log(value), reason => console.log(reason));

storage
  .getJSON()
  .then(value => console.log(value), reason => console.log(reason));

/*
let redis = require('redis');
let client1 = redis.createClient();
let client2 = redis.createClient();

client1.on('error', err => {
  console.log("Redis Error " + err);
});

client1.set('string key', 'string val', redis.print);
client1.hset('hash key', 'hashtest 1', 'some value', redis.print);
client1.hset(['hash key', 'hashtest 2', 'some other value'], redis.print);

client1.hget('hash key', 'hashtest 1', function (err, data) {
  console.log(this);
  console.log(err !== null);
  console.log(typeof err);
  console.log(data);
});

client2.hkeys('hash key', (err, replies) => {
  console.log(replies.length + ' replies:');
  replies.forEach((reply, i) => {
    console.log('     ' + i + ': ' + reply);
  });
  client1.quit();
  client2.quit();
});
*/

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

io.sockets.on('connection', function (socket) {
  let diffsync = server(socket);

  diffsync.on('patch', function (data) {
    console.log(data);
  });

  socket.on('disconnect', function () {
    console.log('Client disconnected');
  });

  console.log('Socket.io connected.');
});
