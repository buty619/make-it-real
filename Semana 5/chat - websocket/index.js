var app = require('express')();
const express = require("express");
var http = require('http').Server(app);
var io = require('socket.io')(http);
const path = require("path");

app.use("/static", express.static(path.join(__dirname, "assets")));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket){
  let usersConnected = Object.values(io.sockets.sockets).filter(s => s.nickName).map(s => s.nickName);
  console.log(usersConnected)
  
  socket.on('logIn',function(nickName){
    socket.nickName = nickName;
    socket.broadcast.emit('logIn', socket.nickName);    
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', {nickName:socket.nickName,msg:msg});
  });

  socket.on('disconnect', function(){
    socket.broadcast.emit('logOut', socket.nickName);
    socket.disconnect(true);
  });

  socket.on('typing', () => {
    socket.broadcast.emit('typing', socket.nickName);
  });

  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', socket.nickName);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});