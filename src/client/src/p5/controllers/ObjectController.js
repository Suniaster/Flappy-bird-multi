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

  moveAndDrawAllObjs(){
    for(let i in this.objects){
      let obj = this.objects[i]
      obj.move()
      obj.draw()
    }
  }
}