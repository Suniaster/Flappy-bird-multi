import Socket from 'socket.io';
import GameControl from './Game/GameControl';

export default class SocketsController{

  io: Socket.Server;
  connections: Socket.Socket[];
  private frameRate :number;


  private gameTimer:NodeJS.Timeout;

  now:Date
  constructor(private serverController: any, private gameController: GameControl){
    this.io = Socket(serverController.server,{});
    this.connections = []

    this.frameRate = 60;
    this.now = new Date();
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
          this.gameTimer = setInterval(
            this.PassTime, 
            1000/this.frameRate
          );
        } 
      })


      socket.on("check-time", (data)=>{
        let client_time = data.time;
        let time_dif    = Math.abs(client_time - this.gameController.time)
        if( time_dif > 3 ){
          console.log(`Game ${socket.id} Not sync -> client=${client_time} server=${ this.gameController.time}`)
          socket.emit("sync-game",{
            time: this.gameController.time,
            objects: this.gameController.getObjectsPositionValues()
          })
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
  private PassTime = () => {
    //* handling deleted objects
    if(this.gameController.deletedObjs.length != 0){
      this.io.sockets.emit('objects-destroyed', {
        ids: this.gameController.deletedObjs
      })
      this.gameController.deletedObjs = []
    }


    //** Handling game end */
    if (!this.gameController.isRunning){
      clearInterval(this.gameTimer);
      this.gameController.resetGame();
      this.io.sockets.emit('game-end')
    }

    //** Handling time **//
    else{
      this.gameController.passTime();
    }

  }

}