import Socket from 'socket.io';

export default class SocketsController{

  io: Socket.Server;
  connections: Socket.Socket[];

  constructor(private serverController: any){
    this.io = Socket(serverController.server,{});
    this.connections = []
  }

  initConnectionsHandler(): void{
    this.io.sockets.on('connection', (socket)=>{
      console.log('Socket connection');
      this.connections.push(socket)
    })
  }

  sendToAllConnections(eventName:string ,message: Object){
    this.connections.forEach((con)=>{
      con.emit(eventName, message);
    })
  }

}