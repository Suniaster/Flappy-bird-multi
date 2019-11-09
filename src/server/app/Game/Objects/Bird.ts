import AbstractThing from "./AbstractThing";

export default class Bird extends AbstractThing{
  constructor(public position:Point, public width, public height){
    super(position, width, height);
    
    this.velocity = {
      x: 0,
      y: 0
    };

    this.accel = {
      x:0,
      y: Bird.gravity
    }
    
    this.symbol = 'Flappy';
  }
}