class DrawerController{

  constructor(ctx, canvas_element, screenControl){
    this.c = canvas_element;
    this.ctx = ctx; 
    this.screenControl= screenControl;

    this.imgFlappy = new Image();
    this.imgTop = new Image();
    this.imgFill = new Image();
    
    this.imgFlappy.src = './client/img/b.png';

    this.imgTop.src = './client/img/cano_top.png'
    this.imgFill.src = './client/img/cano_fill.png'
    this.topHeight = 30;
  }


  drawScaledWall(x,y,width, height){
    let newCoords = this.screenControl.transformCoords({
      x: x,
      y: y
    })
    let newWidth = this.screenControl.scaleWidth(width)
    let newHeight = this.screenControl.scaleHeight(height)

    this.drawWall(newCoords.x, newCoords.y, newWidth, newHeight);
  }

  drawScaledFlappy(x,y,width, height){
    let newCoords = this.screenControl.transformCoords({
      x: x,
      y: y
    })

    let newWidth = this.screenControl.scaleWidth(width)
    let newHeight = this.screenControl.scaleHeight(height)

    this.drawFlappy(newCoords.x, newCoords.y, newWidth, newHeight);
  }

  clearScreen(){
    this.ctx.clearRect(0,0, this.screenControl.screen_width, this.screenControl.screen_height)
  }


  drawWall(x, y, width, height){
    if(y> this.screenControl.screen_height/2) this.drawWallUpWards(x, y, width, height)
    else this.drawWallDownWards(x, y, width, height);
  }
  
  drawFlappy(x,y,width, height){
    this.draw(this.imgFlappy, x, y, width, height)
  }
  
  
  //*   Private  *//
  draw(img, x, y, width, height){
    this.ctx.drawImage(img, x, y, width, height);
  }
  drawWallUpWards(x, y, width, height){
    this.draw(this.imgTop, x, y, width, this.topHeight);
    this.draw(this.imgFill, x, y+this.topHeight, width,height-this.topHeight);
  }
  
  drawWallDownWards(x, y, width, height){
    this.draw(this.imgFill, x, y, width , height-this.topHeight);
    this.draw(this.imgTop, x, y + height-this.topHeight, width, this.topHeight);
  }


}