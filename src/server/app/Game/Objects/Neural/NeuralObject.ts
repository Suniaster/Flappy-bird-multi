import AbstractThing from "../AbstractThing";
import { Network } from "synaptic";




export default abstract class NeuralObject extends AbstractThing{

  brain: Network;
  fitness_score: number;
  alive: boolean;
  threshhold: number;

  constructor(...args:[Vector, number, number, string]){
    super(args[0], args[1], args[2], args[3]);
    
    this.alive = false;
    this.fitness_score = 0;
    
    // Costumizable variables
    this.threshhold = 0.5;
  }

  setBrain(net:Network){
    this.brain = net;
  }

  activateBrain(netInput: number[], callback, outNumber = 0){
    let predict = this.brain.activate(netInput);

    if(predict[outNumber] > this.threshhold){
      callback();
    }
  }

  abstract perform(netInput:number[]);

}