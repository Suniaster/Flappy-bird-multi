const UP = 38;
const DOWN = 40;
const LEFT = 37;
const RIGHT = 39;
const BAR = 32;

//
var c;
var ctx; 

var imgFlappy = new Image();
var imgTop = new Image();
var imgFill = new Image();

imgFlappy.src = './client/img/b.png';
imgTop.src = './client/img/cano_top.png'
imgFill.src = './client/img/cano_fill.png'

var socket = io();

$(document).keydown((event)=>{
  switch(event.keyCode){
    case 65: // A
    socket.emit('jump', null);
    default:
    break;
  }
})

socket.on("gameEnd",()=>{
  var canvasContainer = document.getElementById("canvasContainer");
  canvasContainer.innerHTML = '<button onclick="gamestart()">COMEÇAR JOGO</button>';
})


socket.on("TimePassed", (data)=>{
  ctx.clearRect(0,0, 1000, 1000)
  // console.log(data)
  let obj = JSON.parse(data);
  var img;
  for(var i=0; i<obj.length;i+=1){
    var element = obj[i]
    // console.log(element)
    if(element.symbol == "Wall"){
      drawWall(element.position.x, element.position.y, element.width, element.height)
    }
    else{
      draw(imgFlappy, element.position.x, element.position.y, element.width, element.height);
    }
  }
})

function draw(img, x, y, width, height){
  ctx.drawImage(img, x, y, width, height);
}

function drawWall(x, y, width, height){
  if(y> 1000/2) drawWallUpWards(x, y, width, height)
  else drawWallDownWards(x, y, width, height);
}

function drawWallUpWards(x, y, width, height){
  var topHeight = 30;
  draw(imgTop, x, y, width, topHeight);
  draw(imgFill, x, y+topHeight, width,height-topHeight);
}

function drawWallDownWards(x, y, width, height){
  var topHeight = 30;
  draw(imgFill, x, y, width , height-topHeight);
  draw(imgTop, x, y + height-topHeight, width, topHeight);
}

function gamestart(){
  socket.emit('gameStart',null);
  var canvasContainer = document.getElementById("canvasContainer");
  canvasContainer.innerHTML = '<canvas id="canvas"></canvas>';

  c = document.getElementById("canvas");
  ctx = c.getContext("2d");
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}