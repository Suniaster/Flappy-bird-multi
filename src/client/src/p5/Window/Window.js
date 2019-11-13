


class GameWindow{
  constructor(){
    this.menu = new Menu()
    this.objects = new ObjectController();
    this.imgControl = new ImageController();
  }


  createFlappy(id){
    this.objects.registerObject(id, new AbstractObj(
      {x:30, y:0}, {x:0,y:0}, {x:0, y:1}, 50, 50,
      id, this.imgControl.getImage('flappy')
    ))
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
    this.imgControl.registerImage('flappy', 'guy.png');
    this.imgControl.registerImage('cano', 'cano_fill.png');

    this.imgControl.registerImage('bg', 'back.png');
  }



  
}