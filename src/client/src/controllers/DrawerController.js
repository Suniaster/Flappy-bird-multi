class DrawerController{

  constructor(){
    let ctxTop = document.getElementById("canvasTop").getContext("2d")
    let ctxBottom = document.getElementById("canvasBottom").getContext("2d")

    this.ctx = ctxTop;
    this.ctxBack = ctxBottom
    this.imgControl = new ImageController()

    this.imgControl.registerImage('background', 'back.png')

  }

  drawBackground(){
    this.ctxBack.drawImage(this.imgControl.getImage("background"), 
      0, 0, 
      this.ctxBack.canvas.width, this.ctxBack.canvas.height
    )
  }

  /**
   * 
   * @param {*} objs 
   */
  drawListofObjects(objs, transform_obj){
    for(let obj of objs){
      if(obj == undefined)continue;
      let img = this.imgControl.getImage(obj.id)
      if(img == undefined){
        let name = ''
        switch(obj.symbol){
          case "Flappy":
          name = 'guy.png'
            break;
          default:
          name = 'cano_fill.png'
        }
        img = this.imgControl.registerImage(obj.id, name)
      }
      this.draw(img, obj.position.x, obj.position.y, obj.width, obj.height, transform_obj)
    }
  }

  clearScreen(){
    this.ctx.clearRect(0,0, this.ctx.canvas.width, this.ctx.canvas.height)
  }
  
  //*   Private  *//
  draw(img, x, y, w, h, transform_obj){
    if(transform_obj != undefined){
      let newPos = transform_obj.transformCoords({x, y})
      x = newPos.x
      y = newPos.y

      w = transform_obj.scaleWidth(w)
      h = transform_obj.scaleHeight(h)
    }
    this.ctx.drawImage(img, x, y, w ,h);
  }


}