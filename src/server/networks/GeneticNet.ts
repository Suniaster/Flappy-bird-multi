import AbstractNet from "./AbstractNet";
import { Network, Neuron } from "synaptic";

export default class GeneticNet extends AbstractNet{

  public static mutationRate:number = 0.3;

  public static crossOver(network1:Network, network2: Network){
    var net1_neurons = network1.neurons();
    var net2_neurons = network2.neurons();

    var cutLocation = Math.round(net1_neurons.length * Math.random());

    let offSpring1 = Network.fromJSON(network1.toJSON()); 
    let offSpring2 = Network.fromJSON(network2.toJSON());

    let oS1neuros = offSpring1.neurons();
    let oS2neuros = offSpring2.neurons();

    for(let k = cutLocation; k < net1_neurons.length; k++) {
      oS1neuros[k]['neuron']['bias'] = net2_neurons[k]['neuron']['bias']
      oS2neuros[k]['neuron']['bias'] = net1_neurons[k]['neuron']['bias']
    }
    

    return Math.random() > 0.5 ? offSpring1 : offSpring2
  }
  
  public static mutateNet(network:Network){

    let neurons = network.neurons()
    for (var k = 0; k < neurons.length; k++) {
      //Mutate bias
      neurons[k]['neuron']['bias'] = GeneticNet.mutate(neurons[k]['neuron']['bias'])
    }

    GeneticNet.getNetworkConnections(network).forEach((val)=>{
      val.weight= GeneticNet.mutate(val.weight)
    })
    return network;
  }

  static getNetworkConnections(net:Network){
    let cons = {}
    let neurons = net.neurons()

    // Botando tudo em um hash para evitar repetições
    for(let k=0; k< neurons.length; k+=1){
      for(let c in neurons[k]['neuron'].connections.projected){
        let connection = neurons[k]['neuron'].connections.projected[c]
        cons[c] = connection;
      }

      for(let c in neurons[k]['neuron'].connections.inputs){
        let connection = neurons[k]['neuron'].connections.inputs[c]
        cons[c] = connection;
      }
    }

    let toret = []
    for(let c in cons){
      let connection = cons[c]
      toret.push(connection)
    }
    return toret
  }

  static mutate(gene:any){
    if(Math.random() < GeneticNet.mutationRate){
      let mutateFactor = 1 + (Math.random() - 0.5) * 3 + (Math.random() - 0.5);
      gene *= mutateFactor
    }
    return gene;
  }

}