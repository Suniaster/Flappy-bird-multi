import ObjectController from "../Objects/ObjectsController";
import AbstractThing from "../Objects/AbstractThing";

export default abstract class AbstractSimulationController{
  
  // Time controll
  time: number;
  simulation_running: boolean;

  // Grid Control
  world: {
    width: number,
    height: number
  }

  // Objects Control
  objController: ObjectController;


  constructor(grid_size:number[]= [500, 500]){
    this.world = {
      width: grid_size[1],
      height: grid_size[0]
    }

    //* Controle dos objetos *//
    this.objController = new ObjectController();

    //* Controle geral *//
    this.time = 0;
    this.simulation_running = false;
  }

  /**
   * Retorna verdadeiro caso o tempo tenha passado, falso caso não.
   */
  public abstract simulate(): boolean;
  public abstract reset();
  public abstract simulationSetup(connected_ids:string[]);
  public abstract handleKey(connection_id:string, key:string);
  protected abstract performCollisions();


  public getObjectsPositionValues():ObjectInfoMessage[]{
    return this.objController.getObjValues();
  }

  public resetSimulation(callback =()=>{}):void{
    this.simulation_running = false;
    this.objController.reset()
    this.time = 0;
    
    callback();
  }
  
  resetDeletedBuffer(){
    this.objController.buffer.deletedIds = []
  }
  resetCreatedBuffer(){
    this.objController.buffer.createdObjs = []
  }

  //*** PRIVATE PART ****//

  protected updateObjectsPos():String[]{
    return this.objController.moveAllObjs({x:this.world.width, y: this.world.height})
  }
}