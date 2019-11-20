import Socket from 'socket.io';
import AbstractSimulationController from '../Game/Controller/AbstractSimulationController';


export default class SimulationSocketsController{

  io: Socket.Server;
  connections: Socket.Socket[];

  // Vel functions
  private simulation_rate: number;
  private update_rate: number;

  // Timers
  private timers:{
    simulation: NodeJS.Timeout,
    sync: NodeJS.Timeout
  };


  constructor(private serverController: any, private simulationController: AbstractSimulationController){
    this.io = Socket(serverController.server,{});
    this.connections = []
    this.timers = {
      simulation: null,
      sync: null
    }

    //* Customizable variables
    this.simulation_rate = 60;
    this.update_rate = 20;
  }

  initConnectionsHandler(): void{
    this.io.sockets.on('connection', (socket)=>{

      console.log('Socket connection '+ socket.id);
      this.connections.push(socket)
    
      //** Socket Listeners **/
      socket.on("disconnect", () => {
        this.removeSocket(socket.id);
        this.io.sockets.emit('playerDisconnected', {
          id: socket.id
        })
        console.log('Disconnected');
      })

      socket.on('key-press', (data)=>{
        this.simulationController.handleKey(socket.id, data);
      })

      socket.on('game-start', () => {
        if(!this.simulationController.simulation_running){
          this.io.sockets.emit('game-start', {
            world:{
              width: this.simulationController.world.width,
              height: this.simulationController.world.height
            }
          })
          let ids = this.connections.map(v=> v.id)
          this.simulationController.simulationSetup(ids);

          this.timers.simulation = setInterval(
            this.runSimulation,
            1000/this.simulation_rate
          )

          this.timers.sync = setInterval(
            this.syncClients,
            1000/this.update_rate
          )

        }
      })

    })
  }

  protected removeSocket(id){
    for(let i=0; i< this.connections.length; i+=1){
      if(this.connections[i].id == id){
        this.connections.splice(i,1);
      }
    }
  }

  /** GAME FUNCTIONS */
  protected runSimulation = () => {
    //** Handling game end */
    if (!this.simulationController.simulation_running){
      clearInterval(this.timers.simulation);
      clearInterval(this.timers.sync);

      this.simulationController.reset();
      this.io.sockets.emit('game-end');
    }

    //** Handling time **//
    else{
      this.simulationController.simulate();
    }

  }


  protected syncClients = () =>{

    //* handling deleted objects
    if(this.simulationController.objController.buffer.deletedIds.length != 0){
      this.io.sockets.emit('objects-destroyed', {
        ids: this.simulationController.objController.buffer.deletedIds
      })
      this.simulationController.resetDeletedBuffer();
    }

    //* handling deleted created objs
    if(this.simulationController.objController.buffer.createdObjs.length != 0 ){
      let values =  this.simulationController.objController.buffer.createdObjs.reduce((acc, curr)=>{
        acc.push(curr.getValues())
        return acc;
      }, [])
      this.io.sockets.emit('objects-created', {
        objects: values
      })
      this.simulationController.resetCreatedBuffer();
    }

    // Emiting sync event
    this.io.sockets.emit("sync-game",{
      time: this.simulationController.time,
      // tickrate: tick,
      objects: this.simulationController.getObjectsPositionValues()
    })
  }

}