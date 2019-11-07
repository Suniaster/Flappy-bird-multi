const UP = 38;
const DOWN = 40;
const LEFT = 37;
const RIGHT = 39;
const BAR = 32;

var socket = io();

socket.on('start', (data)=>{
  pos = data;
  ctx.clearRect(0,0, 500, 500)
  ctx.drawImage(img, pos, pos);
})

$(document).keydown((event)=>{
  switch(event.keyCode){
    case RIGHT:
      socket.emit('move', 'right')
      break;
    case LEFT:
      socket.emit('move', 'left')
    default:
    break;
  }
})

socket.on('move', (data)=>{
  pos = data;
  ctx.clearRect(0,0, 500, 500)
  ctx.drawImage(img, pos, pos);
})

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var img = new Image();
img.src = './client/img/b.png';