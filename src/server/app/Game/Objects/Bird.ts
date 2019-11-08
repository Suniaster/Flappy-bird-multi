import AbstractThing from "./AbstractThing";
import CollisionRect from "./Collision/CollisionRectangle";

export default class Bird extends AbstractThing{
  constructor(position:Point){
    super(position);

    var tamanho = 50;
    this.CollisionRangeList.push(
      new CollisionRect(
        {x:position.x,y:position.y},
        {x:position.x+tamanho, y:position.y+tamanho}
      )
    )
    this.velocity = {
      x: 0,
      y: 0
    };

    this.accel = {
      x:0,
      y: Bird.gravity
    }
    
    this.symbol = 'Flappy';
  }
}