import ObjectCollisionRange from "./ObjectCollisionRange";
import AbstractThing from "../AbstractThing";


export default class CollisionController{

  /**
   * ----------- Not working ---------------
   * @param obj1 
   * @param obj2 
   */
  static rectCollision(rect1: AbstractThing, rect2: AbstractThing): boolean{
    if(
      rect1.position.x < (rect2.position.x + rect2.width ) && (rect1.position.x + rect1.width ) > rect2.position.x &&
      rect1.position.y > (rect2.position.y + rect2.height) && (rect1.position.y + rect1.height) < rect2.position.y
    )
      return true
    else return false;
  }

}