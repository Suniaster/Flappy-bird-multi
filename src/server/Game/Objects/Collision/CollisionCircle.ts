import ObjectCollisionRange from "./ObjectCollisionRange";


export default class CollisionCircle extends ObjectCollisionRange{


  constructor(position:Point, private radius){
    super(position)
  }

  isInRange(point:Point){
    if( CollisionCircle.distance({x:this.position.x, y:this.position.y}, point) < this.radius){
      return true;
    }
    else return false;
  }


  
}