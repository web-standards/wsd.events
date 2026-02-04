var express = require('express')
  , app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)

app.listen(1339, '178.79.181.157');

function handler (req, res) {
    res.writeHead(200);
    res.end('SocketIO - server, use 1339 port');
}

var transmitter = null,
    reciver = null;

io.sockets.on('connection', function (socket) {
  console.log('connection');

  switch(express.session.role){
    case 'transmitter':
      transmitter = socket;
      console.log('transmitter');
      break;
    case 'reciver':
      reciver = socket;
      console.log('reciver');
      break;
  }

  socket.on('position', function (position) {
    if(reciver!==null){
      reciver.emit('position',position);
      }
    });

});


io.set('authorization', function (handshakeData, cb) {
    console.log('authorization');
    express.session.role = handshakeData.query.role;
    cb(null, true);
});
