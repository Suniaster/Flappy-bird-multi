import AbstractSimulationController from "./AbstractSimulationController";
import Wall from "../Objects/GameObjects/Wall";
import AbstractThing from "../Objects/AbstractThing";
import Bird from "../Objects/GameObjects/Bird";



export default class FlappyGame extends AbstractSimulationController{
  // Flappy
  wallSpawnTime:number;
  wallUpgradeTime:number;
  initialPositon: Vector


  constructor(grid_size:number[]=[1000,1000]){
    super(grid_size);

    this.wallSpawnTime = 160;
    this.wallUpgradeTime = 400;
    this.initialPositon = {
      x: 50, y: 50
    }
  }


  handleKey(id, key){
    if( this.objController.getById(id) !== undefined){
      if( key === 87) //* W
        this.objController.getById(id).jump();
    }
  }

  simulationSetup(ids:string[]){
    this.simulation_running = true;
    ids.forEach((val)=>{
      let newBird = new Bird({ 
        x: 30,
        y: 0,
      },
      this.initialPositon.x, this.initialPositon.y, val);
      this.objController.register(val, newBird);
    })
  }

  simulate(){
    if(this.time%this.wallSpawnTime == 0){
      this.createWall();
    }

    this.updateObjectsPos();
    this.performCollisions();

    this.time+=1;

    this.simulation_running = this.AnyFlappyAlive();
    return this.simulation_running;
  }


  reset(){
    this.resetSimulation(()=>{})
  }

  public jump(id: string): AbstractThing{
    return this.objController.getById(id).jump();
  }

  protected performCollisions(){
    let cols = this.objController.getCollisions();

    cols.forEach((now)=>{
      if(now[0].symbol != now[1].symbol){
        if(now[0].symbol == "Flappy")
          this.objController.delete(now[0].id)
        if(now[1].symbol == "Flappy")
          this.objController.delete(now[1].id)
      } 
    });
  }

  private createWall(vel_x:number=-2){
    var wallGap = 200;
    var wallThickness = 100;

    var pos_y = Wall.CalculateRandomPosition(this.world.height, 0.25);


    var newWall = new Wall({
        x:this.world.width-1, y:0
      }, 
      wallThickness, pos_y - wallGap/2, 
      "wall-up" + Wall.makeid(7)
    );

    var newWall2 = new Wall({
        x:this.world.width-1, y: pos_y + wallGap/2
      }, 
      wallThickness , this.world.height-(pos_y + wallGap/2), 
      "wall-down"+ Wall.makeid(7)
    );
    ////** Saving Objects
    this.objController.registerWithObjId(newWall);
    this.objController.registerWithObjId(newWall2);

  }

  private AnyFlappyAlive():boolean{
    if(this.objController.getObjsWithSymbol("Flappy").length === 0)
        return false;
    return true;
  }

}