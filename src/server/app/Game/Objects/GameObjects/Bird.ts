import AbstractThing from "../AbstractThing";
import Perceptron from "../../../../networks/Perceptron";

export default class Bird extends AbstractThing{

  /** Neural Net variables */
  brain: Perceptron;
  limit:number;
  score: number;
  alive: boolean;

  constructor(public position:Vector, public width, public height, public id:string=Bird.makeid(10)){
    super(position, width, height, id);

    this.velocity = {
      x: 0,
      y: 0
    };
    
    this.accel = {
      x: 0,
      y: Bird.gravity
    }
    
    this.symbol = 'Flappy';

    this.brain = new Perceptron(4,[3,3],1);
    this.limit = 0.5;
    this.alive = true;
    this.score = 0;
  }

  /**
   * 1 - distancia até o final do próximo cano,
   * 2 - altura do cano de baixo
   * 3 - altura em y
   * 4 - velocidade y
   */
  must_jump(pipeDistance, lowerPipeHeight, birdHeight, birdVel):boolean{
    let predict = this.brain.activate([pipeDistance, lowerPipeHeight, birdHeight, birdVel])
    
    if(predict[0] > this.limit)
      return true;
    else 
      return false
  }

}