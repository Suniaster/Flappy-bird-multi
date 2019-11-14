


class GameWindow{
  constructor(){
    this.menu = new Menu()
    this.objects = new ObjectController();
    this.imgControl = new ImageController();

    this.size = {
      x: 1000, y:1000
    }
    this.socket = null;
    this.time = 0;
  }

  //**  P5 Methods   **//
  setWindowSize(x,y){
    this.size.x = x;
    this.size.y = y;
    resizeCanvas(x,y);
  }

  drawFPS(){
    push()
      let fps = frameRate();
      fill(255);
      stroke(0);
      text("FPS: " + fps.toFixed(2), 10, height - 10);
    pop()
  }

  setup(){
  }

  preload(){
    this.imgControl.registerImage('flappy', 'bird2.png');
    this.imgControl.registerImage('cano', 'cano_fill.png');

    this.imgControl.registerImage('bg', 'back.png');
  }

  //**  Socket Methods  **//

  registerSocket(socket){
    this.socket = socket
    this.menu.registerSocket(socket);
  }



  //**  Objects Methods  **//
  createFlappy(id){
    this.objects.registerObject(id, new AbstractObj(
      {x:30, y:0}, {x:0,y:0}, {x:0, y:1}, 50, 50,
      id, this.imgControl.getImage('flappy')
    ))
  }

  createObject(symbol, position, vel, accel, id, width, height){
    let img = undefined
    
    switch(symbol){
      case 'Flappy':
        img = this.imgControl.getImage('flappy')
        break;
      case "Wall":
        img = this.imgControl.getImage('cano')
        break;
    }

    this.objects.registerImage(id, new AbstractObj(
      position, vel, accel, width, height,
      id, img
    ))
  }
}