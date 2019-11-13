

let game = new GameWindow();
let socketControl = new SocketsController(game);

socketControl.startConnection();

function preload() {
  game.preload();
}

function setup() {
  let canv = createCanvas(1080, 680);
  canv.position(0, 0);
  frameRate(60);

  game.createFlappy(socketControl.socket.id)
  game.setup()
  game.menu.drawMenu();
}

function draw() {
  background(100);
  game.drawFPS();
  
  if(game.menu.gameRunning){
    game.objects.moveAndDrawAllObjs()
  } 
}

function keyPressed(){
  console.log(keyCode)
  switch(keyCode){
    case 87: // W
      game.objects.getObject(socketControl.socket.id).jump()
      break;
    case 68: // D
      break;
    case 65: // A
      break;
    case 32: // Space
      break; 
  }
}
