import AbstractThing from "../Objects/AbstractThing";
import ObjectsController from "../Objects/ObjectsController";
import Bird from "../Objects/GameObjects/Bird";
import GeneticNet from "../../../networks/GeneticNet";




export default class NeuralBirds{

  birds: Bird[];
  generation: number;

  constructor(public objController:ObjectsController = new ObjectsController(),public batch_size:number=10){
    this.birds = [];
    this.generation = 1;
  }

  createBird():Bird{
    return new Bird({x:200,y:300},50,50, 'bot-4331-'+Bird.makeid(5))
  }

  generateNewBatch(){
    if(this.generation == 1){
      for(let i=0;i<this.batch_size;i+=1){
        let newBird = this.createBird()
        this.birds.push(newBird);
        this.objController.registerWithObjId(newBird);
      }
      this.generation += 1;
    }
    else{
      // Sort list by better scores

      this.birds.sort((a,b)=>{
        return b.score - a.score
      })

      // Select first four
      let top = this.birds.splice(0,4);
      console.log(`---> Generation ${this.generation} | Top Score: ${top[0].score}`)

      // Generate off spring

      let offSpring = []
      for(let i=0;i<8;i+=1){
        let dad = Math.ceil(Math.random()*3);
        let mom = Math.ceil(Math.random()*3);

        while(mom == dad) dad = Math.ceil(Math.random()*3);

        let newBird = this.createBird()
        newBird.brain = GeneticNet.crossOver(
          top[dad].brain,
          top[mom].brain
        )
        offSpring.push(newBird)
      }

      // Mutate off spring

      offSpring.forEach((bird)=>{
        GeneticNet.mutateNet(bird.brain)
      })

      // Create new generation
      let newGeneration = offSpring
      let royaltyLenght = 2

      for(let i=0;i<royaltyLenght;i+=1){
        let royal = this.createBird()
        royal.brain = top[i].brain
        newGeneration.push(royal)
      }

      // Register objects
      newGeneration.forEach((bird)=>{
        this.objController.registerWithObjId(bird);
      })

      this.birds = newGeneration;
      this.generation += 1
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