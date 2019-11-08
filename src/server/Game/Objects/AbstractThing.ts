import CollisionRect from "./Collision/CollisionRectangle";

export default abstract class AbstractThing{

  static gravity = 1;

  public velocity:Point;
  public accel: Point;

  public symbol:string;

  public CollisionRangeList: CollisionRect[];
  constructor(public position:Point){
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

  getMovementValues(){
    return {
      position:{
        x: this.position.x,
        y: this.position.y,
      },
      symbol: this.symbol
    }

  }
}