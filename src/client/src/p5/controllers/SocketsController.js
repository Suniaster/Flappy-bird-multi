

class SocketsController{
  constructor(gameController){
    this.gameController = gameController
    this.socket = undefined
  }

  startConnection(){
    this.socket = io();


    this.socket.on("gameStart", (data)=>{
      // this.gameController.setWindowSize(data.window.x, data.window.y);
      this.gameController.menu.initGame();
      console.log(data)
      for(let i=0;i<data.birds.ids.length;i+=1){
        let id = data.birds.ids[i]
        this.gameController.createFlappy(id)
      }
    })

    this.socket.on("Object-created", (data)=>{
      this.gameController.createObject(
        data.symbol, 
        data.position, 
        data.vel,
        data.accel,
        data.id,
        data.width,
        data.height
      )
    })

    this.socket.on("Object-destroyed", (data)=>{
      this.gameController.objects.unregisterObject(data.id)
    })

    this.socket.on("gameEnd", ()=>{
      //TODO: fazer fim de jogo
    })


    this.socket.on("jump", (data)=>{
      this.gameController.objects.getObject(data.id).jump(data.vel_y)
    })
  }



}