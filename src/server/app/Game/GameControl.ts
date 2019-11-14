import Bird from "./Objects/GameObjects/Bird";
import Wall from "./Objects/GameObjects/Wall";
import AbstractThing from "./Objects/AbstractThing";
import CollisionController from "./Objects/Collision/CollisionController";
import ObejctController from "./Objects/ObjectsController";




export default class GameControl{
  time: number;
  isRunning: boolean;
  wallDistance:number;
  world: {
    width: number,
    height: number
  }

  objController: ObejctController;

  newObjs: AbstractThing[];
  deletedObjs: AbstractThing[];

  constructor(grid_size:number[]= [500, 500]){
    this.world = {
      width: grid_size[1],
      height: grid_size[0]
    }

    //* Controle dos objetos *//
    this.objController = new ObejctController();
    this.newObjs = [];
    this.deletedObjs = [];

    //* Controle geral *//
    this.time = 0;
    this.isRunning = false;
    
    //**Variaveis do flappy **/
    this.wallDistance = 50;
  }

  /**
   * Retorna verdadeiro caso o tempo tenha passado, falso caso não.
   */
  public passTime(): boolean{

    // if( this.time%this.wallDistance == 0){
    //   this.createWall();
    // }

    this.verifyCollisions();
    this.updateObjectsPos();
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


  public jump(id: string):void{
    this.objController.getById(id).jump()
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
  private createWall(){
    var wallGap = 200;
    var wallThickness = 100;

    var pos_y = Wall.CalculateRandomPosition(this.world.height, 0.25);
    // var pos_y = Math.floor(this.grid.rows/4);
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
    
    this.objController.registerWithObjId(newWall);
    this.objController.registerWithObjId(newWall2);
  }

  private verifyCollisions(){
    let colided;
    var cols = this.objController.getCollisions();
    // console.log(cols);
  }

  private AnyFlappyAlive():boolean{
    if(this.objController.getObjsWithSymbol("Flappy").length === 0)
        return false;
    return true;
  }

  private updateObjectsPos(){
    var deleted_objs = this.objController.moveAllObjs({x:this.world.width, y: this.world.height})
    this.deletedObjs.concat(deleted_objs);
  }
}