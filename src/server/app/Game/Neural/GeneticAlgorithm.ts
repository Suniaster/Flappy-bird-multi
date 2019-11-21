import NeuralObject from "../Objects/Neural/NeuralObject";
import AbstractThing from "../Objects/AbstractThing";
import ObjectController from "../Objects/ObjectsController";
import GeneticNet from "../../../networks/GeneticNet";



export default class GeneticAlgorithm<T extends NeuralObject>{

  objects: T[]
  generation: number;
  test_id: string;

  //* 
  elite_size: number
  verbose: boolean;

  constructor(
      public ObjectConstructor: new(...args:any)=> T,
      public default_obj_params:any[],
      public objects_controller:ObjectController = new ObjectController(), 
      public batch_size=10,
      public test_prefix = "test"
    ){
    
    this.test_id = AbstractThing.makeid(10)
    this.objects = [];
    this.generation = 1;

    //* Customizable variables
    this.elite_size = 3;
    this.verbose = false;
  }

  public passGeneration(){
    if(this.generation === 1){
      if(this.verbose) console.log(`Test Number: ${this.test_id}`)
      this.generateFirstGeneration();
    }
    else{
      this.evolveGeneration();
    }
    this.generation += 1;
  }

  public checkKilledObjects(fitness_for_killed: number){
    this.objects_controller.buffer.deletedIds.forEach((killedId)=>{

      this.objects.forEach((neuralObj)=>{
        if(killedId === neuralObj.id && neuralObj.alive){
          neuralObj.alive = false;
          neuralObj.fitness_score = fitness_for_killed;
        }
      })

    })
  }

  private evolveGeneration(){
    //* Sort by fittest 
    this.objects.sort((a,b)=>{
      return b.fitness_score - a.fitness_score
    })

    //* Get Elite
    let elite = this.objects.splice(0, this.elite_size);
    if(this.verbose) console.log(`-> Generation ${this.generation} | Best Fitness: ${elite[0].fitness_score}`)

    //* Generate OffSpring
    let offspring:T[] = []
    for(let i=0; i<this.batch_size - this.elite_size; i+=1){
      // random choose a dad and mom from elite
      let dad = Math.round(Math.random()*(this.elite_size-1));
      let mom = Math.round(Math.random()*(this.elite_size-1));

      while(mom == dad) dad = Math.round(Math.random()*(this.elite_size-1));

      // create crossovered son
      let newObj = this.createObject();
      newObj.brain = GeneticNet.crossOver(
        elite[dad].brain,
        elite[mom].brain
      )

      offspring.push(newObj);
    }

    //* Mutate Offspring
    offspring.forEach((obj)=>{
      GeneticNet.mutateNet(obj.brain);
    })

    //* Insert elite in new generation
    let newGeneration = offspring 
    elite.forEach((obj)=>{
      let newObj = this.createObject();
      newObj.brain = obj.brain;
      newGeneration.push(newObj);
    })

    //* Register objects
    newGeneration.forEach((obj)=>{
      this.objects_controller.registerWithObjId(obj);
    })

    //* Save result
    GeneticNet.save(elite[0].brain, `./neuralNets/${this.test_prefix}-${this.test_id}.json`)
    this.objects = newGeneration;
  }
  
  private createObject():T{
    let params = JSON.parse(JSON.stringify(this.default_obj_params))
    return new this.ObjectConstructor(...params);
  }

  public generateFirstGeneration(){
    for(let i=0;i<this.batch_size;i+=1){
      let newObj = this.createObject();
      this.objects.push(newObj);
      this.objects_controller.registerWithObjId(newObj);
    }
  }

}