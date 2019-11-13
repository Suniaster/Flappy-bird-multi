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
        console.log('Disconnected');
      })


      //** Game Listeners **/
      socket.on("jump", (data)=>{
        if(this.gameController.isRunning)
          this.gameController.jump(data.id)
      })

      socket.on("isRunning", ()=>{

      })

      socket.on("gameStart", (data)=>{
        if(!this.gameController.isRunning){
          let gridConfig = {
            grid:{
              width: this.gameController.grid.cols,
              height: this.gameController.grid.rows
            }
          }

          this.sendToAllConnections("gameStart",gridConfig)
          this.gameController.createBirds(data.birdIds)
          this.gameController.isRunning = true;

          this.gameTimer = setInterval(
            this.PassTime(), 
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
    var strMsg = JSON.stringify(message);
    this.connections.forEach((con)=>{
      con.emit(eventName, strMsg);
    })
  }

  createListenerToConnections(eventName: string, functionCallBack: (data: Object)=>{}){
    this.connections.forEach((con)=>{
      con.on(eventName, functionCallBack);
    })
  }

  /** GAME FUNCTIONS */
  private PassTime(){
    return ()=>{
      if (!this.gameController.isRunning){
        clearInterval(this.gameTimer);
        this.gameController.resetGame();
        this.sendToAllConnections('gameEnd', {})
      }
      else{
        this.gameController.passTime();
        this.sendToAllConnections('TimePassed',this.gameController.getObjectsPositionValues());
      }
    }
  }

}