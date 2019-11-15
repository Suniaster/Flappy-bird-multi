

class SocketsController{
  constructor(gameController){
    this.gameController = gameController
    this.socket         = undefined
  }

  startConnection(){
    this.socket = io();


    this.socket.on("game-start", (data)=>{
      // this.gameController.setWindowSize(data.window.x, data.window.y);
      this.gameController.menu.initGame();
      for(let i=0;i<data.birds.ids.length;i+=1){
        let id = data.birds.ids[i]
        this.gameController.createFlappy(id)
      }
    })

    this.socket.on("object-created", (data)=>{
      console.log("Object "+data.id+" created")
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

    this.socket.on("objects-destroyed", (data)=>{
      data.ids.map((id)=>{
        console.log("Object "+id+" destroyed")
        this.gameController.objects.unregisterObject(id)
      })
    })

    this.socket.on("game-end", ()=>{
      //TODO: fazer fim de jogo
      this.gameController.menu.drawMenu()
      this.gameController.time=0;
      this.gameController.menu.gameRunning = false;
    })

    this.socket.on("jump", (data)=>{
      this.gameController.objects.getObject(data.id).jump(data.vel_y)
    })

    this.socket.on("sync-game", (data)=>{
      console.log(data)
      data.objects.forEach((obj)=>{
        this.gameController.objects.updateObj(
          obj.id,
          obj.position,
          obj.vel,
          obj.accel
        )
      })
      this.gameController.time = data.time;
    })

  }

}