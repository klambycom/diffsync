let app = require('http').createServer(handler);
let io = require('socket.io')(app);
let fs = require('fs');

app.listen(8000);
console.log('Server started, on port 8000.');

function handler(req, res) {
  console.log(new Date(), req.url);

  let file = '/client.html';
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
  socket.on('message', function () {});
  socket.on('disconnect', function () {});

  console.log('Socket.io connected.');
});
