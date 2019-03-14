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
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});