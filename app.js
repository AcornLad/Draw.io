var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

/*
app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});
*/
app.use(express.static(__dirname + '/'));

//All lines ever drawn
var line_history = [];

io.on('connection', function(socket){
  //First send history to client
  for (var i in line_history){
    socket.emit('draw_line', { line: line_history[i] });
  }
  //Then handle message type "draw_line"
  socket.on('draw_line', function(data){
    line_history.push(data.line);
    io.emit('draw_line', { line: data.line });
  });
});



http.listen(3000, function(){
  console.log('Listening on *:3000');
});
