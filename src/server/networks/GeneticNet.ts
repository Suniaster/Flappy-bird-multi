import AbstractNet from "./AbstractNet";
import { Network, Neuron } from "synaptic";
import { Hash } from "crypto";

export default class GeneticNet extends AbstractNet{

  public static mutationRate:number = 0.2;


  public static crossOver(network1:Network, network2: Network, key:string){
    var a = network1.neurons();
    var b = network2.neurons();

    var cutLocation = Math.round(a.length * Math.random());

    var tmp;
    for (var k = cutLocation; k < a.length; k++) {
      // Swap
      tmp = a[k]['neuron'][key];
      a[k]['neuron'][key] = b[k]['neuron'][key];
      b[k]['neuron'][key] = tmp;
    }
  }
  
  public static mutateNeurons(a:number[], mutationRate: number = GeneticNet.mutationRate){
    
    for (var k = 0; k < a.length; k++) {
      // Should mutate?
      if (Math.random() > mutationRate) {
          continue;
      }
      a[k]['neuron']['bias'] += a[k]['bias'] * (Math.random() - 0.5) * 3 + (Math.random() - 0.5);
      GeneticNet.mutateNeuron(a[k]['neuron']);
    }
  }

  public static mutate(net: Network):Network{
    GeneticNet.mutateNeurons(net.neurons());
    return net;
  }

  public static mutateNeuron(a:any, mutationRate: number=GeneticNet.mutationRate){
    var connections = a.connections.projected;
    for (const con in connections) {
       // Should mutate?
      if (Math.random() > mutationRate) {
        continue;
      }
      if (connections.hasOwnProperty(con)) {
        connections[con].weight += connections[con].weight * (Math.random() - 0.5) * 3 + (Math.random() - 0.5);;
      }
    }
  }

}