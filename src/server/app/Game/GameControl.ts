import Bird from "./Objects/GameObjects/Bird";
import Wall from "./Objects/GameObjects/Wall";
import AbstractThing from "./Objects/AbstractThing";
import CollisionController from "./Objects/Collision/CollisionController";
import ObejctController from "./Objects/ObjectsController";




export default class GameControl{
  
  // Time controll
  time: number;
  isRunning: boolean;

  // Grid Control
  world: {
    width: number,
    height: number
  }

  // Objects Control
  objController: ObejctController;
  newObjs: AbstractThing[];
  buffer: {
    deletedIds: String[],
    createdObjs: AbstractThing[]
  };

  // Flappy
  wallSpawnTime:number;
  wallUpgradeTime:number


  constructor(grid_size:number[]= [500, 500]){
    this.world = {
      width: grid_size[1],
      height: grid_size[0]
    }

    //* Controle dos objetos *//
    this.objController = new ObejctController();
    this.newObjs = [];
    this.buffer = {
      deletedIds: [],
      createdObjs: []
    };

    //* Controle geral *//
    this.time = 0;
    this.isRunning = false;
    
    //**Variaveis do flappy **/
    this.wallSpawnTime = 160;
    this.wallUpgradeTime = 400
  }

  /**
   * Retorna verdadeiro caso o tempo tenha passado, falso caso não.
   */
  public passTime(): boolean{

    if( this.time%this.wallSpawnTime == 0){
      this.createWall();
    }

    this.updateObjectsPos();
    this.verifyCollisions();
    this.time+=1;

    this.isRunning = this.AnyFlappyAlive();
    return this.isRunning
  }

  public getObjectsPositionValues():ObjectInfoMessage[]{
    return this.objController.getObjValues();
  }

  public createBirds(ids: string[]){
    ids.forEach((val)=>{
      let newBird = new Bird({ 
        x: 30,
        y: 0,
      },
      50, 50, val);
      this.objController.register(val, newBird);
    })
  } 

  public resetGame():void{
    this.isRunning = false;
    this.objController = new ObejctController();
    this.time = 0;
  }

  public jump(id: string):AbstractThing{
    return this.objController.getById(id).jump()
  }

  //*** PRIVATE PART ****//
  /**
   * Wall:
   * 
   *    *-------------------*
   *    |            *      |
   *    |                   |
   *    |                   |
   *    |                   |
   *    |                   |
   *    |                   |
   *    |            *      |
   *    |                   |
   *    |                   |
   *    |                   |
   *    *-------------------*
   * 
   * aa
   */
  private createWall(vel_x:number=-2){
    var wallGap = 200;
    var wallThickness = 100;

    var pos_y = Wall.CalculateRandomPosition(this.world.height, 0.25);


    var newWall = new Wall({
        x:this.world.height-1, y:0
      }, 
      wallThickness, pos_y - wallGap/2, 
      "up" + Wall.makeid(7)
    );

    var newWall2 = new Wall({
        x:this.world.height-1, y: pos_y + wallGap/2
      }, 
      wallThickness , this.world.height-(pos_y + wallGap/2), 
      "down"+ Wall.makeid(7)
    );
    ////** Saving Objects
    this.objController.registerWithObjId(newWall);
    this.objController.registerWithObjId(newWall2);
    
    this.buffer.createdObjs.push(newWall);
    this.buffer.createdObjs.push(newWall2);
  }

  private verifyCollisions():void{
    var cols = this.objController.getCollisions();

    let killedObjs:String[] = []
    killedObjs = cols.reduce((accumulator, now)=>{
      if(now[0].symbol != now[1].symbol){
        if(now[0].symbol == "Flappy")
          accumulator.push(now[0].id);
          this.objController.delete(now[0].id)
        if(now[1].symbol == "Flappy")
          this.objController.delete(now[1].id)
          accumulator.push(now[1].id);
      } 
      return accumulator
    }, []);
    this.buffer.deletedIds = this.buffer.deletedIds.concat(killedObjs)
  }

  private AnyFlappyAlive():boolean{
    if(this.objController.getObjsWithSymbol("Flappy").length === 0)
        return false;
    return true;
  }

  private updateObjectsPos():void{
    var deleted_objs = this.objController.moveAllObjs({x:this.world.width, y: this.world.height})
    this.buffer.deletedIds = this.buffer.deletedIds.concat(deleted_objs);
  }
}