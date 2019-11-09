export default abstract class ObjectCollisionRange{

  constructor(public position:Point){
  }

  abstract isInRange(arg1:Point):boolean;

  static distance(p1:Point, p2:Point):number{
    return Math.sqrt(
      (Math.pow(p1.x-p2.x,2) + Math.pow(p1.y-p2.y,2))
    )
  }


}