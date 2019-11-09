import Bird from "./Objects/Bird";
import AbstractThing from "./Objects/AbstractThing";
import Wall from "./Objects/Wall";
import SimpleGrid from "./Grid/HtmlGrid";
import CollisionController from "./Objects/Collision/CollisionController";



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

    // var pos_y = Wall.CalculateRandomPosition(this.grid.rows, 0.4);
    var pos_y = Math.floor(this.grid.rows/4);
    var newWall = new Wall({
      x:this.grid.cols-1, y:0
    }, wallThickness, pos_y);

    var newWall2 = new Wall({
      x:this.grid.cols-1, y: pos_y + wallGap
    }, wallThickness , this.grid.rows-(pos_y + wallGap));

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

    this.verifyCollisions();
    this.updateObjectsPos();
    this.updateGrid();
    this.time+=1;

    this.isRunning = this.FlappyAlive();
    return this.isRunning
  }

  public getObjectsPositionValues():ObjectInfoMessage[]{
    return this.objects.map((v)=>{
      return v.getMovementValues();
    })
  }


  //*** PRIVATE PART ****//
  public restartGame(){
    this.isRunning = false;
    this.objects = [];

    this.flappy = new Bird({ 
      x: Math.floor(this.grid.cols/7),
      y: Math.floor(this.grid.rows/5)
    }, 50, 50);
    
    this.objects.push(this.flappy);
    this.grid.resetGrid();
  }

  private verifyCollisions(){
    let colided;
    let obj1;
    let obj2;
    let length= this.objects.length;
    for(let i=0;i<length; i+=1){
      obj1 = this.objects[i];
      for(let j=i+1;j<length;j+=1){
        if(i===j){
          continue;
        }

        obj2 = this.objects[j];

        colided = CollisionController.rectCollision(obj1, obj2);
        // console.log(colided)
        if(colided){
          if(obj1.symbol == "Flappy"){
            this.objects.splice(i,1);
            length= this.objects.length;
            i-=1;
            break;
          }
          if(obj2.symbol == "Flappy"){
            this.objects.splice(j,1);
            length= this.objects.length
            j-=1;
          }
        }
      }
    }
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

      if(obj.position.x < 0 || obj.position.x >= this.grid.cols){
        this.objects.splice(i,1);
        i-=1;
      }
      if(obj.position.y < 0 || obj.position.y >= this.grid.rows){
        this.objects.splice(i,1);
        i-=1;
      }
    }
  }

  private updateGrid(){
    this.grid.resetGrid();
    this.objects.forEach((obj)=>{
      this.grid.grid[obj.position.y][obj.position.x] = obj.symbol
    })
  }
}