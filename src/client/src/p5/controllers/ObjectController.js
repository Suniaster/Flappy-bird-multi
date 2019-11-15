class ObjectController{
  constructor(){
    this.objects = {}
  }

  getObject(id){
    return this.objects[id]
  }
  registerObject(name, toAdd){
    this.objects[name] = toAdd
    return this.objects[name]
  }
  unregisterObject(name){
    delete this.objects[name]
  }

  idExists(id){
    if(this.objects[id] != undefined)
      return true
    return false
  }

  updateObj(id, pos, vel, accel){
    this.objects[id].position = pos;
    this.objects[id].vel      = vel;
    this.objects[id].accel    = accel;
  }

  moveAndDrawAllObjs(){
    for(let i in this.objects){
      let obj = this.objects[i]
      obj.move()
      obj.draw()
    }
  }
}