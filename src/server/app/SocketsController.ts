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

    this.frameRate = 50;
    this.now = new Date();
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
        let id = socket.id
        if(this.gameController.isRunning &&
          this.gameController.objController.getById(id) !== undefined){
          let obj = this.gameController.jump(id)
          socket.broadcast.emit("jump", {id: id, vel_y: obj.velocity.y})
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
    var aux = new Date();
    var runtime = (aux.getMilliseconds() - this.now.getMilliseconds())
    console.log("FPS: " + (runtime/1000));
    //* handling deleted objects
    if(this.gameController.deletedObjs.length != 0){
      this.sendToAllConnections('objects-destroyed', {
        ids: this.gameController.deletedObjs
      })
      this.gameController.deletedObjs = []
    }


    //** Handling game end */
    if (!this.gameController.isRunning){
      clearInterval(this.gameTimer);
      this.gameController.resetGame();
      this.sendToAllConnections('game-end', {})
    }

    //** Handling time **//
    else{
      this.gameController.passTime();
    }

    this.now = new Date();
  }

}