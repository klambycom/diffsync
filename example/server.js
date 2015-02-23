let app = require('http').createServer(handler);
let io = require('socket.io')(app);
let fs = require('fs');

app.listen(8000);

function handler(req, res) {
  fs.readFile(__dirname + '/client.html', function (err, data) {
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
});
