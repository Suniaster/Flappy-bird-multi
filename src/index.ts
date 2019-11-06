import express from 'express'
var path = require('path');

var app = express();
var server = require('http').Server(app);
var dirname = __dirname + '/../src'

app.get('/', function(req, res){
  var name = path.resolve(dirname + '/client/index.html')
  res.sendFile(name);
})

app.use('/client', express.static(path.resolve(dirname + '/client')))

console.log(dirname)
console.log("Server alive")
server.listen(2000);

import Socket from 'socket.io';

var io = Socket(server,{});

io.sockets.on('connection', (socket)=>{
    console.log('Socket connection');

    socket.emit('serverMsg', {
      msg: 'a'
    })

    socket.on('frontMsg', (data)=>{
      console.log(data)
    })
})