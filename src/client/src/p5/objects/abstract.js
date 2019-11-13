class AbstractObj{
  constructor(position, vel, accel, width, height, id, img){
    this.position = position
    this.vel = vel
    this.accel = accel
    
    this.width = width
    this.height = height

    this.id = id
    this.img = img
  }

  move(){
    this.updateVel();
    this.position.x += this.vel.x
    this.position.y += this.vel.y
  }

  updateVel(){
    this.vel.x += this.accel.x
    this.vel.y += this.accel.y
  }

  draw(){
    push();
      textSize(20);
      text(this.id.substring(0, 5), this.position.x,  this.position.y);
      fill(0, 102, 153);


      translate(this.position.x+(this.width/2), this.position.y+(this.height/2))
      
      let arc = this.vel.y/50
      let sig = 1
      rotate(sig*Math.asin(arc))

      image(
        this.img,
        -(this.width/2), -(this.height/2) ,
        this.width, this.height)
    pop();
  }


  jump(y_vel){
    this.vel.y = y_vel
  }

}