import ObjectCollisionRange from "./ObjectCollisionRange";
import AbstractThing from "../AbstractThing";


export default class CollisionController{ 

  
  static rectCollision(rect1: AbstractThing, rect2: AbstractThing): boolean{
    let AX1 = rect1.position.x;
    let AX2 = rect1.position.x + rect1.width;
    let AY1 = rect1.position.y;
    let AY2 = (rect1.position.y + rect1.height)*-1;

    let BX1 = rect2.position.x;
    let BX2 = rect2.position.x + rect2.width;
    let BY1 = rect2.position.y*-1;
    let BY2 = (rect2.position.y + rect2.height)*-1;

    if (AX1 < BX2 && AX2 > BX1 &&
        AY1 > BY2 && AY2 < BY1) 
      return true
    else return false;
  }

}