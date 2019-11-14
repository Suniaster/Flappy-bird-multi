import Socket from 'socket.io';
import GameControl from './Game/GameControl';

export default class SocketsController{

  io: Socket.Server;
  connections: Socket.Socket[];
  private frameRate :number;


  private gameTimer:NodeJS.Timeout;

  constructor(private serverController: any, private gameController: GameControl){
    this.io = Socket(serverController.server,{});
    this.connections = []

    this.frameRate = 60;
  }

  initConnectionsHandler(): void{
    this.io.sockets.on('connection', (socket)=>{

      console.log('Socket connection '+ socket.id);
      this.connections.push(socket)
    
      //** Socket Listeners **/
      socket.on("disconnect", (data)=>{
        this.removeSocket(socket.id);
        this.sendToAllConnections('playerDisconnected', {
          id: socket.id
        })
        console.log('Disconnected');
      })


      //** Game Listeners **/
      socket.on("jump", (data)=>{
        if(this.gameController.isRunning){
          let obj = this.gameController.jump(data.id)
          socket.broadcast.emit("jump", {id: data.id, vel_y: obj.velocity.y})
        }
      })

      socket.on("game-start", (data)=>{
        if(!this.gameController.isRunning){
          let ids = this.connections.map(v=> v.id)
          this.gameController.createBirds(ids)

          this.sendToAllConnections("game-start",{
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
    })
  }

  removeSocket(id){
    for(let i=0; i< this.connections.length; i+=1){
      if(this.connections[i].id == id){
        this.connections.splice(i,1);
      }
    }
  }

  sendToAllConnections(eventName:string ,message: Object){
    this.connections.forEach((con)=>{
      con.emit(eventName, message);
    })
  }

  /** GAME FUNCTIONS */
  private PassTime = () => {
    if(this.gameController.deletedObjs.length != 0){
      this.sendToAllConnections('objects-destroyed', {
        ids: this.gameController.deletedObjs
      })
      this.gameController.deletedObjs = []
    }

    if (!this.gameController.isRunning){
      clearInterval(this.gameTimer);
      this.gameController.resetGame();
      this.sendToAllConnections('game-end', {})
    }
    else{
      this.gameController.passTime();
    }
  }

}