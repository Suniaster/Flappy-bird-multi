import express from 'express'
var path = require('path');

export default class ServerController{

  app: any;
  server_dir: string;
  server: any;

  constructor(){
    this.app = express();
    this.server = require('http').Server(this.app);
    this.server_dir = __dirname + '/../../../src';
  }

  initServer(){
    
    this.app.get('/', (req, res)=>{
      var name = path.resolve(this.server_dir + '/client/index.html')
      res.sendFile(name);
    })
    
    this.app.use('/client', express.static(path.resolve(this.server_dir + '/client')))
    
    console.log("Server alive");
    this.server.listen(2000);
  }
}