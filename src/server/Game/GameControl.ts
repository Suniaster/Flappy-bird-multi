import Bird from "./Objects/Bird";
import AbstractThing from "./Objects/AbstractThing";
import Wall from "./Objects/Wall";
import SimpleGrid from "./Grid/HtmlGrid";



export default class GameControl{
  grid:SimpleGrid;
  flappy: Bird;

  objects: AbstractThing[];

  time: number;

  constructor(grid_size:number[]= [500, 500]){
    this.grid = new SimpleGrid(grid_size[0], grid_size[1]);
    this.objects = [];
    
    this.flappy = new Bird(Math.floor(grid_size[0]/10), Math.floor(grid_size[1]/10));
    this.objects.push(this.flappy);

    this.time = 0;
  }

  createWall(){
    var newWall = new Wall(1, this.grid.cols-2);
    this.objects.push(newWall);
  }

  continue(){
    this.passTime();
    // console.clear();
    this.grid.draw();
  }


  passTime(){
    this.updateObjectsPos();
    this.updateGrid();
    this.time+=1;
  }

  public getObjectsPositionValues(){
    return this.objects.map((v)=>{
      return v.getMovementValues();
    })
  }


  private updateObjectsPos(){
    for(var i = 0; i< this.objects.length; i+=1){
      var obj = this.objects[i];
      obj.move();
      if(obj.pos_x < 0 || obj.pos_x > this.grid.rows){
        this.objects.splice(i,1);
        i-=1;
      }
      if(obj.pos_y < 0 || obj.pos_y > this.grid.cols){
        this.objects.splice(i,1);
        i-=1;
      }
    }
  }

  private updateGrid(){
    this.grid.resetGrid();
    this.objects.forEach((obj)=>{
      this.grid.grid[obj.pos_x][obj.pos_y] = obj.symbol
    })
  }
}