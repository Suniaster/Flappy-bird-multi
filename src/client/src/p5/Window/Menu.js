
class Menu{
  constructor(){
    this.gameRunning = false;

    this.startbutton = undefined;
  }

  drawMenu(){
    this.startbutton = createButton('Start Game');
    this.startbutton.position(19, 19);
    this.startbutton.mousePressed(this.startGame);
  }

  startGame = () =>{
    this.gameRunning = true;
    this.startbutton.remove()
  }
}