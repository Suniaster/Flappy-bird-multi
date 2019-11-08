import Socket from 'socket.io';
import GameControl from '../Game/GameControl';

export default class SocketsController{

  io: Socket.Server;
  connections: Socket.Socket[];

  constructor(private serverController: any, private gameController: GameControl){
    this.io = Socket(serverController.server,{});
    this.connections = []
  }

  initConnectionsHandler(): void{
    this.io.sockets.on('connection', (socket)=>{
      console.log('Socket connection');
      this.connections.push(socket)

      socket.on("jump", (data)=>{
          this.gameController.flappy.vel_y = -15
      })
    })
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

}