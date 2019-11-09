import Bird from "./Objects/Bird";
import AbstractThing from "./Objects/AbstractThing";
import Wall from "./Objects/Wall";
import SimpleGrid from "./Grid/HtmlGrid";



export default class GameControl{
  grid:SimpleGrid;
  flappy: Bird;

  objects: AbstractThing[];

  time: number;

  isRunning: boolean;

  constructor(grid_size:number[]= [500, 500]){
    this.grid = new SimpleGrid(grid_size[0], grid_size[1]);
    this.objects = [];
    this.time = 0;
    
    //**Variaveis do flappy **/
    this.flappy = new Bird({ 
      x: Math.floor(grid_size[0]/10),
      y: Math.floor(grid_size[1]/10)
    },
    50, 50);
    this.objects.push(this.flappy);
    this.isRunning = false;
  }

  /**
   * Wall:
   * 
   *    *-------------------*
   *    |            *      |
   *    |                   |
   *    |                   |
   *    |                   |
   *    |                   |
   *    |                   |
   *    |            *      |
   *    |                   |
   *    |                   |
   *    |                   |
   *    *-------------------*
   * 
   * aa
   */
  public createWall(){
    var wallGap = 200;
    var wallThickness = 100;

    var pos_y = Wall.CalculateRandomPosition(this.grid.rows, 0.4);

    var newWall = new Wall({
      x:this.grid.cols-1, y:0
    }, wallThickness, pos_y);

    var newWall2 = new Wall({
      x:this.grid.cols-1, y: pos_y + wallGap
    }, wallThickness , this.grid.rows-1 -(pos_y + wallGap));

    this.objects.push(newWall);
    this.objects.push(newWall2);
  }

  /**
   * Retorna verdadeiro caso o tempo tenha passado, falso caso não.
   */
  public passTime(): boolean{

    if( this.objects.length == 1){
      this.createWall();
    }

    this.updateObjectsPos();
    this.updateGrid();
    this.time+=1;

    this.isRunning = this.FlappyAlive();
    return this.isRunning
  }

  public getObjectsPositionValues():ObjectPositionMessage[]{
    return this.objects.map((v)=>{
      return v.getMovementValues();
    })
  }


  //*** PRIVATE PART ****//
  public restartGame(){
    this.isRunning = false;
    this.objects = [];

    this.flappy = new Bird({ 
      x: Math.floor(this.grid.cols/10),
      y: Math.floor(this.grid.rows/10)
    }, 50, 50);
    
    this.objects.push(this.flappy);
    this.grid.resetGrid();
  }


  private FlappyAlive():boolean{
    for(var i=0;i<this.objects.length ;i+=1){
      if(this.objects[i].symbol == "Flappy")
        return true;
    }
    return false;
  }


  private updateObjectsPos(){
    for(var i = 0; i< this.objects.length; i+=1){
      var obj = this.objects[i];

      obj.move();

      if(obj.position.x < 0 || obj.position.x > this.grid.rows){
        this.objects.splice(i,1);
        i-=1;
      }
      if(obj.position.y < 0 || obj.position.y > this.grid.cols){
        this.objects.splice(i,1);
        i-=1;
      }
    }
  }

  private updateGrid(){
    this.grid.resetGrid();
    this.objects.forEach((obj)=>{
      this.grid.grid[obj.position.x][obj.position.y] = obj.symbol
    })
  }
}