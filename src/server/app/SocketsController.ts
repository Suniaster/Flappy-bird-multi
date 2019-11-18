import Socket from 'socket.io';
import GameControl from './Game/GameControl';

export default class SocketsController{

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

  timeControl : {
    time1: Date,
    time2?: Date,
    counter1: number,
    counter2?: number,
  }

  constructor(private serverController: any, private gameController: GameControl){
    this.io = Socket(serverController.server,{});
    this.connections = []

    this.simulation_rate = 60;
    this.update_rate = 20;

    this.timeControl = {
      time1: new Date(),
      counter1: 0,
    }

    this.timers = {
      simulation: null,
      sync: null
    }
  }

  initConnectionsHandler(): void{
    this.io.sockets.on('connection', (socket)=>{

      console.log('Socket connection '+ socket.id);
      this.connections.push(socket)
    
      //** Socket Listeners **/
      socket.on("disconnect", (data)=>{
        this.removeSocket(socket.id);
        this.io.sockets.emit('playerDisconnected', {
          id: socket.id
        })
        console.log('Disconnected');
      })


      //** Game Listeners **/
      socket.on("jump", (data)=>{
        let id = socket.id
        if(this.gameController.isRunning &&
          this.gameController.objController.getById(id) !== undefined){
          let obj = this.gameController.jump(id)
          this.io.sockets.emit("jump", {id: id, vel_y: obj.velocity.y})
        }
      })

      socket.on("game-start", (data)=>{
        if(!this.gameController.isRunning){
          let ids = this.connections.map(v=> v.id)
          this.gameController.createBirds(ids)

          this.io.sockets.emit("game-start",{
            window: {
              width:  this.gameController.world.width,
              height: this.gameController.world.height
            },
            birds:{
              ids: ids
            }
          })

          this.gameController.isRunning = true;
          this.timers.simulation = setInterval(
            this.simulateGame, 
            1000/this.simulation_rate
          );

          this.timeControl = {
            time1: new Date(),
            counter1: this.gameController.time
          }

          this.timers.sync = setInterval(
            this.syncGames,
            1000/this.update_rate
          )

        } 
      })
    })
  }

  removeSocket(id){
    for(let i=0; i< this.connections.length; i+=1){
      if(this.connections[i].id == id){
        this.connections.splice(i,1);
      }
    }
  }

  /** GAME FUNCTIONS */
  private simulateGame = () => {
    //* handling deleted objects
    if(this.gameController.objController.buffer.deletedIds.length != 0){
      this.io.sockets.emit('objects-destroyed', {
        ids: this.gameController.objController.buffer.deletedIds
      })
      this.gameController.objController.buffer.deletedIds = []
    }

    //* handling deleted created objs
    if(this.gameController.objController.buffer.createdObjs.length != 0 ){
      let values =  this.gameController.objController.buffer.createdObjs.reduce((acc, curr)=>{
        acc.push(curr.getValues())
        return acc;
      }, [])
      this.io.sockets.emit('objects-created', {
        objects: values
      })
      this.gameController.objController.buffer.createdObjs = [];
    }

    //** Handling game end */
    if (!this.gameController.isRunning){
      clearInterval(this.timers.simulation);
      clearInterval(this.timers.sync);

      this.gameController.resetGame();
      this.io.sockets.emit('game-end')
    }

    //** Handling time **//
    else{
      this.gameController.passTime();
    }

  }


  private syncGames = () =>{
    //* Calculating Tick
    // let timepassed = this.timeControl.time1.getTime() - new Date().getTime()  
    // let simulation_counter = this.gameController.time - this.timeControl.counter1
    // let tick = timepassed/simulation_counter;

    // let frame_rate = 1000/tick

    //* Updating variables
    // this.timeControl = {
    //   time1: new Date(),
    //   counter1: this.gameController.time
    // }

    // Emiting sync event
    this.io.sockets.emit("sync-game",{
      time: this.gameController.time,
      // tickrate: tick,
      objects: this.gameController.getObjectsPositionValues()
    })
  }

}