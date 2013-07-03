var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

server.listen(3303);

app.use(express.static(__dirname));
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
	socket.on('subscribe', function(data) { socket.join(data.room); })
	socket.on('unsubscribe', function(data) { socket.leave(data.room); })
	socket.on('getpubroomAll', function(data) { 
		socket.emit('getpubroomAll', io.sockets.manager.rooms);
	});
	socket.on('getusrroomAll', function(data) { 
		socket.emit('getusrroomAll', io.sockets.manager.roomClients[socket.id]);
	});
	
	socket.on('message1', function(message){
		// use socket.broadcast.emit when you really have two separate client, for demo, emit is used.
		socket.broadcast.to(message.room).emit('message1', message);
		//socket.broadcast.emit('message1', message);
	});
	
	socket.on('message2', function(message){
		// use socket.broadcast.emit when you really have two separate client, for demo, emit is used.
		socket.broadcast.to(message.room).emit('message2', message);
		//socket.broadcast.emit('message2', message);
	});  
});