import { Layer, Network } from 'synaptic';
const fs = require('fs');

export default class AbstractNet extends Network{

  public static loadJSON(file_path: string){
    var exported = fs.readFileSync(file_path).toString()

    return JSON.parse(exported);
  }

  public save(file_path: string){
    var myNetJSON = this.toJSON()
    fs.writeFile(file_path, JSON.stringify(myNetJSON) ,function(err) {
      if(err) {
        return console.log(err);
      }
    }); 
  }

}