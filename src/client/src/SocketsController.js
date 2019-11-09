class SocketsController{

  constructor(){
    this.socket = null;
    this.canvasController = null;
    this.drawer = null;
    
    new ScreenController().changeContainerToButton('canvasContainer',this.gamestart())
  }

  startConnection(){
    this.socket = io();

    $(document).keydown((event)=>{
      switch(event.keyCode){
        case 65: // A
        this.socket.emit('jump', null);
        default:
        break;
      }
    })

    this.socket.on("gameStart", (data)=>{
      let obj = JSON.parse(data);
      this.canvasController =  new ScreenController(
        obj.grid.width, 
        obj.grid.height, 
        window.innerWidth,
        window.innerHeight
      )
      let c = this.canvasController.changeContainerToCanvas("canvasContainer")
      let ctx = c.getContext("2d");
      this.drawer = new DrawerController(
        ctx,
        c,
        this.canvasController
      )
      ctx.canvas.width  = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    })

    this.socket.on("gameEnd",()=>{
      this.canvasController.changeContainerToButton("canvasContainer", this.gamestart())
    })
    

    this.socket.on("TimePassed", (data)=>{
      this.drawer.clearScreen()
      // console.log(data)
      let obj = JSON.parse(data);
      var img;
      for(var i=0; i<obj.length;i+=1){
        var element = obj[i]
        // console.log(element)
        if(element.symbol == "Wall"){
          this.drawer.drawScaledWall(element.position.x, element.position.y, element.width, element.height)
        }
        else{
          this.drawer.drawScaledFlappy(element.position.x, element.position.y, element.width, element.height);
        }
      }
    })
  }

  gamestart(){
    return ()=>{
      this.socket.emit('gameStart', null);
    }
  }
}