
class Menu{
  constructor(){
    this.gameRunning = false;
    this.startbutton = undefined;
    this.socket = null;
  }

  drawMenu(){
    this.startbutton = createButton('Start Game');
    this.startbutton.position(19, 19);
    this.startbutton.mousePressed(this.startGameEvent);
  }

  initGame(){
    this.gameRunning = true;
    this.startbutton.remove()
  }

  startGameEvent = () =>{
    if(this.socket != null){
      this.socket.emit('gameStart', null);
    }
  }

  //** Sockets **//
  registerSocket(socket){
    this.socket = socket;
  }
}