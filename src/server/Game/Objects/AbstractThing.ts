


export default abstract class AbstractThing{

  static gravity = 1;

  public pos_x:number;
  public pos_y:number;
  public vel_x;
  public vel_y;
  public accel_x;
  public accel_y;

  public symbol:string;

  constructor(ini_pos_x:number, ini_pos_y:number){
    this.pos_x = ini_pos_x;
    this.pos_y = ini_pos_y;
  }

  move(){
    this.updateVel();
    this.pos_x += this.vel_x;
    this.pos_y += this.vel_y;
  }

  updateVel(){
    this.vel_x += this.accel_x;
    this.vel_y += this.accel_y;
  }

  getMovementValues(){
    return {
      pos_x: this.pos_x,
      pos_y: this.pos_y,
      symbol: this.symbol
    }

  }
}