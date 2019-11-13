class ImageController{
  constructor(){
    this.images = {}
  }

  getImage(name){
    return this.images[name]
  }

  registerImage(name, image_name){
    this.images[name] = loadImage('./client/img/'+ image_name)
    return this.images[name]
  }

  unregisterImage(name){
    delete this.images[name]
  }

}