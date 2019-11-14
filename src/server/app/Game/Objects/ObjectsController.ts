import AbstractThing from "./AbstractThing";
import CollisionController from "./Collision/CollisionController";



export default class ObejctController{
  objects: {[id:string]: AbstractThing}

  constructor(){
    this.objects = {}
  }

  register(id:string, obj: AbstractThing):AbstractThing{
    this.objects[id] = obj
    return obj
  }

  registerWithObjId(obj:AbstractThing){
    this.objects[obj.id] = obj
    return obj
  }

  delete(id: string){
    let copy = this.objects[id]
    delete this.objects[id]
    return copy;
  }

  getObjValues():ObjectInfoMessage[]{
    let retList = []
    for( let i in this.objects){
      let newObj = this.objects[i]
      retList.push(newObj.getValues())
    }
    return retList
  }

  getById(id):AbstractThing{
    return this.objects[id];
  }

  getObjsWithSymbol(symbol:string):AbstractThing[]{
    return Object.values(this.objects).filter(v => v.symbol === symbol);
  }

  getCollisions(): [AbstractThing, AbstractThing][]{
    let collisionList = []
    let keys = Object.keys(this.objects);
    for(let i=0;i<keys.length;i+=1){
      for(let j = i+1;j<keys.length;j+=1){
        if(CollisionController.rectCollision(
          this.objects[keys[i]],
          this.objects[keys[j]]
        )) collisionList.push([ this.objects[keys[i]],this.objects[keys[j]] ])
      }
    }
    return collisionList
  }

  /**
   * 
   * @param max_pos 
   * @param min_pos 
   * @returns List with id of (deleted) objects
   */
  moveAllObjs(max_pos:Point={x:1000000, y:1000000}, min_pos:Point={x:0,y:0}): String[]{
    return Object.values(this.objects).reduce((acc,obj)=>{
      obj.move();
      if(
        obj.position.x < min_pos.x || obj.position.x > max_pos.x ||
        obj.position.y < min_pos.y || obj.position.y > max_pos.y
      ){
        this.delete(obj.id);
        acc.push(obj.id)
      }
      return acc;
    }, [])
  }
}