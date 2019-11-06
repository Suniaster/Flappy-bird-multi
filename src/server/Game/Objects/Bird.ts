import AbstractThing from "./AbstractThing";

export default class Bird extends AbstractThing{
  constructor(pos_x, pos_y){
    super(pos_x, pos_y);
    this.vel_y = 0;
    this.vel_x = 0;
    
    this.accel_y = 0;
    this.accel_x = Bird.gravity;


    this.symbol = '@';
  }
}