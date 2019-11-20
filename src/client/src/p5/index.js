

let game = new GameWindow();
let socketControl = new SocketsController(game);

socketControl.startConnection();
game.registerSocket(socketControl.socket);

function preload() {
  game.preload();
}

function setup() {
  let canv = createCanvas(game.size.x, game.size.y);
  canv.position(0, 0);
  frameRate(60);

  game.createFlappy(socketControl.socket.id)
  game.setup()
  game.menu.drawMenu();
}

function draw() {
  background(game.imgControl.getImage('bg'));
  game.drawFPS();
  
  if(game.menu.gameRunning){
    game.objects.moveAndDrawAllObjs()
    game.time += 1
  } 
}

function keyPressed(){
  switch(keyCode){
    case 87: // W
      socketControl.socket.emit('key-press', keyCode)
      break;
    case 68: // D
      break;
    case 65: // A
      break;
    case 32: // Space
      break; 
  }
}
