import ObjectCollisionRange from "./ObjectCollisionRange";
import CollisionRect from "./CollisionRectangle";


export default class CollisionController{

  /**
   * ----------- Not working ---------------
   * @param obj1 
   * @param obj2 
   */
  static objectCollided(obj1: ObjectCollisionRange, obj2: ObjectCollisionRange):boolean{

    return false;
  }

  static rectCollision(rect1: CollisionRect, rect2: CollisionRect): boolean{
    if(
      rect1.position.x < rect2.p2.x && rect1.p2.x > rect2.position.x &&
      rect1.position.y > rect2.p2.y && rect1.p2.y < rect2.position.y
    )
      return true
    else return false;
  }

}