class ImageController{
  constructor(){
    this.images = {}
  }

  getImage(name){
    return this.images[name]
  }

  registerImage(name, image_name){
    let toAdd =  new Image()
    toAdd.src = './client/img/'+ image_name
    this.images[name] = toAdd
    return this.images[name]
  }

  unregisterImage(name){
    delete this.images[name]
  }

}