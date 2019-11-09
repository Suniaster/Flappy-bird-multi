class ScreenController{

  constructor(grid_width, grid_height, screen_width, screen_height){
    this.grid_width = grid_width
    this.grid_height = grid_height
    this.screen_width = screen_width
    this.screen_height = screen_height

    this.scale_width_factor = Math.floor(screen_width/grid_width);
    this.scale_height_factor = Math.floor(screen_height/grid_height);
  }


  scaleHeight(oldHeight){
    return oldHeight*this.scale_height_factor
  }

  scaleWidth(oldWidth){
    return oldWidth*this.scale_width_factor
  }

  transformCoords({old_x, old_y}){
    return {
      x: old_x*this.scale_width_factor,
      y: old_y*this.scale_height_factor
    }
  }

  changeContainerToCanvas(id){
    let canvasContainer = document.getElementById(id);
    canvasContainer.innerHTML = '<canvas id="canvas"></canvas>';
    return document.getElementById("canvas");
  }

  changeContainerToButton(id, callback_function){
    var canvasContainer = $("#canvasContainer");
    canvasContainer.html( '<button id="but">COMEÇAR JOGO</button>' );
    $("#but").click(callback_function)
    return  document.getElementById("but");
  }

}