import Bird from "./Objects/Bird";
import AbstractThing from "./Objects/AbstractThing";
import Wall from "./Objects/Wall";
import SimpleGrid from "./Grid/HtmlGrid";
import CollisionController from "./Objects/Collision/CollisionController";



export default class GameControl{
  grid:SimpleGrid;
  objects: AbstractThing[];
  time: number;
  isRunning: boolean;

  birds: { [id: string] : Bird; } = {};
  wallDistance = 300;

  constructor(grid_size:number[]= [500, 500]){
    this.grid = new SimpleGrid(grid_size[0], grid_size[1]);
    this.objects = [];
    this.time = 0;
    this.isRunning = false;
    
    //**Variaveis do flappy **/
    this.birds = {};
    this.wallDistance = 30;
  }

  /**
   * Retorna verdadeiro caso o tempo tenha passado, falso caso não.
   */
  public passTime(): boolean{

    if( this.time%this.wallDistance == 0){
      this.createWall();
    }

    this.verifyCollisions();
    this.updateObjectsPos();
    this.updateGrid();
    this.time+=1;

    this.isRunning = this.AnyFlappyAlive();
    return this.isRunning
  }

  public getObjectsPositionValues():ObjectInfoMessage[]{
    let retList = []
    this.objects.forEach((v)=>{
      retList.push( v.getMovementValues() );
    })
    for(var key in this.birds) {
      let obj = this.birds[key];
      retList.push(obj);
    }
    return retList
  }

  public createBirds(ids: string[]){
    ids.forEach((val)=>{
      let newBird = new Bird({ 
        x: Math.floor(this.grid.cols/10),
        y: Math.floor(this.grid.rows/10),
      },
      50, 50, val);
      this.birds[newBird.id] = newBird;
    })
  } 

  public resetGame(){
    this.isRunning = false;
    this.objects = [];
    this.birds = {};
    this.time = 0;
    this.grid.resetGrid();
  }

  public removeBirdById(id:string){
    delete this.birds[id];
  }

  public jump(id: string){
    this.birds[id].jump();
  }
  
  //*** PRIVATE PART ****//
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
  private createWall(){
    var wallGap = 200;
    var wallThickness = 100;

    var pos_y = Wall.CalculateRandomPosition(this.grid.rows, 0.4);
    // var pos_y = Math.floor(this.grid.rows/4);
    var newWall = new Wall({
      x:this.grid.cols-1, y:0
    }, wallThickness, pos_y);

    var newWall2 = new Wall({
      x:this.grid.cols-1, y: pos_y + wallGap
    }, wallThickness , this.grid.rows-(pos_y + wallGap));

    this.objects.push(newWall);
    this.objects.push(newWall2);
  }

  private verifyCollisions(){
    let colided;
    let obj1: Bird;
    let obj2;
    let length= this.objects.length;
    for(var key in this.birds) {
      obj1 = this.birds[key];
      for(let j=0;j<length;j+=1){
        obj2 = this.objects[j];

        colided = CollisionController.rectCollision(obj1, obj2);
        // console.log(colided)
        if(colided){
          this.removeBirdById(obj1.id)
        }
      }
    }
  }

  private AnyFlappyAlive():boolean{
    if(Object.keys(this.birds).length === 0)
        return false;
    return true;
  }

  private updateObjectsPos(){
    for(var i = 0; i< this.objects.length; i+=1){
      var obj = this.objects[i];

      obj.move();

      if(
        obj.position.x < 0 || obj.position.x >= this.grid.cols ||
        obj.position.y < 0 || obj.position.y >= this.grid.rows
      ){
        this.objects.splice(i,1);
        i-=1;
      }
    }

    // Move birds
    for(var key in this.birds) {
      let bird = this.birds[key];

      bird.move()
      if(
        bird.position.x < 0 || bird.position.x >= this.grid.cols ||
        bird.position.y < 0 || bird.position.y >= this.grid.rows
      ){
        this.removeBirdById(bird.id)
      }
    }
  }

  private updateGrid(){
    this.grid.resetGrid();
    this.objects.forEach((obj)=>{
      this.grid.grid[obj.position.y][obj.position.x] = obj.symbol
    })

    // Update position of birds
    for(var key in this.birds) {
      let obj = this.birds[key];
      this.grid.grid[obj.position.y][obj.position.x] = obj.symbol
    }
  }
}