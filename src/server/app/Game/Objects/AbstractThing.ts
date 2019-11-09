export default abstract class AbstractThing{

  static gravity = 1;

  public velocity:Point;
  public accel: Point;
  public symbol:string;


  constructor(public position:Point, public width, public height){
  

  }

  move(){
    this.updateVel();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  
  }

  updateVel(){
    this.velocity.x += this.accel.x;
    this.velocity.y += this.accel.y;
  }

  getMovementValues(): ObjectPositionMessage{
    return {
      position:{
        x: this.position.x,
        y: this.position.y,
      },
      symbol: this.symbol,
      width: this.width,
      height: this.height
    }
  }
}