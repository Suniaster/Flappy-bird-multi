// require("./app");
import AbstractNet from "./server/networks/AbstractNet"
var readlineSync = require('readline-sync');
const fs = require('fs');




var json_net = AbstractNet.loadJSON("./net.json")

var myNetwork = AbstractNet.fromJSON(json_net);

console.log(myNetwork.activate([0,0]));   
// -> [0.015020775950893527]

console.log(myNetwork.activate([0,1]));  
// -> [0.9815816381088985]

console.log(myNetwork.activate([1,0]));  
// ->  [0.9871822457132193]

console.log(myNetwork.activate([1,1]));  

var neuron:any = myNetwork.neurons()[0]['neuron'];
console.log(neuron["bias"])