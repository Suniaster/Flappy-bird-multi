import Perceptron from "../../../../networks/Perceptron";
import NeuralObject from "./NeuralObject";

export default class NeuralBird extends NeuralObject{

  /** Neural Net variables */
  brain: Perceptron;

  constructor(public position:Vector, public width, public height, public id:string=NeuralBird.makeid(10)){
    super(position, width, height, id);

    this.velocity = {
      x: 0,
      y: 0
    };
    
    this.accel = {
      x: 0,
      y: NeuralBird.gravity
    }
    
    this.symbol = 'Flappy';
    this.brain = new Perceptron(4,[3,2],1);
  }

  /**
   * 1 - distancia até o final do próximo cano,
   * 2 - altura do cano de baixo
   * 3 - altura em y
   * 4 - velocidade y
   */
  public perform(netInput:number[]){
    this.activateBrain(netInput, ()=>{
      this.jump();
    })
  }

}