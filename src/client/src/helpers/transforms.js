class TransformGrid{

  constructor(grid_width, grid_height, screen_width, screen_height){
    this.grid_width = grid_width
    this.grid_height = grid_height
    this.screen_width = screen_width
    this.screen_height = screen_height
    
    this.scale_width_factor = screen_width/grid_width;
    this.scale_height_factor = screen_height/grid_height;
  }


  scaleHeight(oldHeight){
    return Math.floor(oldHeight*this.scale_height_factor)
  }

  scaleWidth(oldWidth){
    return Math.floor(oldWidth*this.scale_width_factor)
  }

  transformCoords({x, y}){
    return {
      x: Math.floor(x*this.scale_width_factor),
      y: Math.floor(y*this.scale_height_factor)
    }
  }
}