

class SocketsController{
  constructor(gameController){
    this.gameController = gameController
    this.socket = undefined
  }

  startConnection(){
    this.socket = io();

  }


}