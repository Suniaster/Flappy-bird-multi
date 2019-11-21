import AbstractSimulationController from "./AbstractSimulationController";
import NeuralBird from "../Objects/Neural/NeuralBirds";
import Wall from "../Objects/GameObjects/Wall";
import FlappyGenetic from "../Neural/Genetic/FlappyGenetic";



export default class NeuralFlappyController extends AbstractSimulationController{

  geneticController: FlappyGenetic;
  wallSpawnTime: number;
  constructor(grid_size){
    super(grid_size);

    this.geneticController = new FlappyGenetic(
      NeuralBird,
      [{x:50, y:200}, 50,50],
      this.objController
    )
    

    this.geneticController.verbose = true;
    this.wallSpawnTime = 160;

  }


  public handleKey(connection_id:string, key:string){return}

  reset(){
    this.resetSimulation(()=>{})
  }
  simulationSetup(ids){
    this.geneticController.passGeneration();
    this.simulation_running = true;
  }

  simulate(){
    this.updateObjectsPos();

    if(this.time%this.wallSpawnTime == 0){
      this.createWall();
    }
    
    this.performCollisions();

    this.geneticController.checkKilledObjects(this.time);
    this.geneticController.makeObjsPerform();

    this.simulation_running = this.AnyFlappyAlive();
    
    this.time+=1;
    return this.simulation_running;
  }

  performCollisions(){
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