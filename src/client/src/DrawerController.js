class DrawerController{

  constructor(ctx, canvas_element){
    this.c = canvas_element;
    this.ctx = ctx; 
    
    this.imgFlappy = new Image();
    this.imgTop = new Image();
    this.imgFill = new Image();
    
    this.imgFlappy.src = './client/img/b.png';

    this.imgTop.src = './client/img/cano_top.png'
    this.imgFill.src = './client/img/cano_fill.png'
    this.topHeight = 30;
  }

  drawFlappy(x,y,width, height){
    this.draw(this.imgFlappy, x, y, width, height)
  }
  
  drawWall(x, y, width, height){
    if(y> 1000/2) this.drawWallUpWards(x, y, width, height)
    else this.drawWallDownWards(x, y, width, height);
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