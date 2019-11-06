import AbstractThing from "./AbstractThing";



export default class Wall extends AbstractThing{
  constructor(pos_x, pos_y){
    super(pos_x, pos_y);
    this.vel_y = -1;
    this.vel_x = 0;
    this.accel_x = 0;
    this.accel_y = 0;

    this.symbol = '#';
  }
}