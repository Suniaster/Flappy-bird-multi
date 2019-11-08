import AbstractGrid from "./AbstractGrid";

export default class GameGrid extends AbstractGrid{

  draw(grid:string[][]=this.grid){
    grid.forEach((line, i)=>{
      line.forEach((val, j)=>{
        if(i==0 || i==grid.length-1)
          process.stdout.write('-')
        else if( j==line.length-1 || j== 0)
          process.stdout.write('|')
        else
          process.stdout.write(val)
      })
      process.stdout.write("\n");
    })
  }

}