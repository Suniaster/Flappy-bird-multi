import InterfaceGeneticAlgorithm from "./InterfaceGeneticAlgorithm";
import NeuralBird from "../../Objects/Neural/NeuralBirds";


export default class FlappyGenetic extends InterfaceGeneticAlgorithm<NeuralBird>{


  public makeObjsPerform(){
    this.objects.forEach((val:NeuralBird)=>{
      if(val.alive){
        let wall = this.objects_controller.findObjectLessDistance(val, 'wall-down')
        let dist = (wall.position.x + wall.width) - val.position.x
        val.perform([dist, wall.position.y, val.position.y, val.velocity.y])
      }
    })
  }
}