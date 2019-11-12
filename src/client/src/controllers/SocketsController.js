
class SocketsController{
  constructor(){
    this.drawer = new DrawerController()
    this.createClickEvent()
    
    this.transforms = undefined
    this.socket = io()
  }

  startConnection = () =>{
    
    this.socket.on("TimePassed", (data)=>{
      let objs = JSON.parse(data);
      this.drawer.clearScreen();
      this.drawer.drawListofObjects(objs, this.transforms);
    })

    this.socket.on("gameStart", (data)=>{
      let obj = JSON.parse(data);
      console.log("GAME STARTED")

      this.transforms = new TransformGrid(
        obj.grid.width,
        obj.grid.height,
        this.drawer.ctx.canvas.width,
        this.drawer.ctx.canvas.height
      )

    })

    $(document).keydown((event)=>{
      switch(event.keyCode){
        case 65: // A()=>{
        this.socket.emit("jump", {
          id: this.socket.id
        })
      }
    })
  }

  createClickEvent = () => {
    document.getElementById("but").addEventListener("click", ()=>{
      this.startGame();
    })
  }

  startGame = () => {
    this.drawer.drawBackground();
    this.socket.emit("gameStart", {
      birdIds: [this.socket.id]
    })
  }
}