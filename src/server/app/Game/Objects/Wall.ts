import AbstractThing from "./AbstractThing";



export default class Wall extends AbstractThing{
  constructor(position:Point){
    super(position);
    this.velocity = {
      x: -1,
      y: 0
    }

    this.accel = {
      x: 0,
      y: 0
    }

    this.symbol = 'Wall';
  }
}