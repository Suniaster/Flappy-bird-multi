


export default abstract class AbstractGrid{

  static BLANK = ' ';
  public grid:string[][];
  
  constructor(public rows:number, public cols: number){
    this.grid = AbstractGrid.createBlankGrid(rows, cols);
  }

  abstract draw();

  static createBlankGrid(rows:number, cols:number):string[][]{
    var newGrid = []
    for(var i=0; i< rows;i+=1){
      newGrid.push([]);
      for(var j=0;j < cols;j+=1){
        newGrid[i].push(AbstractGrid.BLANK);
      }
    }
    return newGrid;
  }

  resetGrid(){
    this.grid = AbstractGrid.createBlankGrid(this.rows, this.cols);
  }
}