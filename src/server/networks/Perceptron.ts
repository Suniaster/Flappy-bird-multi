import { Layer, Network } from 'synaptic';

export default class Perceptron extends Network{

  constructor(input:number, hidden:number[], output:number){
    super();

    var inputLayer = new Layer(input);
    var hiddenLayers:Layer[]= []
    for(let i=0;i<hidden.length; i+=1){
      hiddenLayers.push(new Layer(hidden[i]))
    }
    var outputLayer = new Layer(output);

    
    inputLayer.project(hiddenLayers[0]);

    for(let i=0;i<hidden.length-1;i+=1){
      hiddenLayers[i].project(hiddenLayers[i+1])
    }

    hiddenLayers[hidden.length-1].project(outputLayer);

    this.set({
      input: inputLayer,
      hidden: hiddenLayers,
      output: outputLayer
    })
  }
}