import AbstractGrid from "./AbstractGrid";


export default class HtmlGrid extends AbstractGrid{

  draw(){
    var c:any = document.getElementById("canv");
    var ctx = c.getContext("2d");
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 100);
    ctx.stroke();
  }
}