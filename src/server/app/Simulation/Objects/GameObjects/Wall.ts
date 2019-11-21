import AbstractThing from "../AbstractThing";



export default class Wall extends AbstractThing{
  constructor(position:Vector, width, height, id:string=Wall.makeid(10)){
    super(position, width, height, id);
    this.velocity={
      x: -2,
      y: 0
    }

    this.accel = {
      x: 0,
      y: 0
    }

    this.symbol = 'Wall';
  }

  /**
   * @param length of screen
   * @param P number between 0 and 0.5 percentage of screen to ignore;
   */
  static CalculateRandomPosition(length, P){
    var r = Math.random();
    var x = P * length;

    var h = length;
    var L = x + (h - (2*x))*r
    L = Math.floor(L);
    return L;
  }
}