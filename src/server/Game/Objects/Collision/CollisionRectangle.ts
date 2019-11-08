import ObjectCollisionRange from "./ObjectCollisionRange";


export default class CollisionRect extends ObjectCollisionRange{

  /**
   * Retangulo:
   *      
   *      P1
   *      *-----------* 
   *      |           |
   *      |           |
   *      |           |
   *      |           |
   *      *-----------* <- P2
   * @param p1
   * @param p2 
   */

  constructor(p1:Point, public p2:Point){
    super(p1);
  }

  isInRange(point:Point ){
    if( 
      point.x > this.position.x && 
      point.x < this.p2.x &&
      point.y > this.position.y &&
      point.y < this.p2.y
    ){
      return true;
    }
    else return false;
  }

  static collision(rect1: CollisionRect, rect2: CollisionRect): boolean{
    if(
      rect1.position.x < rect2.p2.x && rect1.p2.x > rect2.position.x &&
      rect1.position.y > rect2.p2.y && rect1.p2.y < rect2.position.y
    )
      return true
    else return false;
  }

}