import AbstractThing from "../Objects/AbstractThing";
import ObjectsController from "../Objects/ObjectsController";
import Bird from "../Objects/GameObjects/Bird";




export default class NeuralBirds{

  birds: Bird[];
  generation: number;

  constructor(public objController:ObjectsController = new ObjectsController(),public batch_size:number=10){
    this.birds = [];
    this.generation = 1;
  }

  generateNewBatch(){
    if(this.generation == 1){
      for(let i=0;i<this.batch_size;i+=1){
        let newBird = new Bird({x:30,y:80},50,50, 'bot-4331-'+Bird.makeid(5))
        this.birds.push(newBird);
        this.objController.registerWithObjId(newBird);
      }
      this.generation += 1;
    }
    else{
    }
  }

  perform(){
    this.birds.forEach((val:Bird)=>{
      if(val.alive){
        let wall = this.objController.findObjectLessDistance(val, 'wall-down')
        let dist = (wall.position.x + wall.width) - val.position.x
        if(val.must_jump(dist,wall.position.y,val.position.y, val.velocity.y)){
          val.jump();
        }
      }
    })
  }

  checkKilledBirds(score: number){
    this.objController.buffer.deletedIds.forEach((killedId)=>{
      this.birds.forEach((neural)=>{
        if(killedId === neural.id){
          neural.alive = false;
          neural.score = score;
        }
      })
    })
  }

  printScores(){
    console.log("------ SCORES: -------")
    this.birds.forEach((bird)=>{
      console.log(`${bird.id}: ${bird.score}`)
    })

    console.log("----- END SCORES ------")
  }

}