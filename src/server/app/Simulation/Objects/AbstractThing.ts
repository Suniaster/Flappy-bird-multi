export default abstract class AbstractThing{

  static gravity = 1;

  public velocity:Vector;
  public accel: Vector;
  public symbol:string;

  constructor(public position:Vector, public width, public height, public id:string){
  }
  
  static makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public move(){
    this.updateVel();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  public updateVel(){
    this.velocity.x += this.accel.x;
    this.velocity.y += this.accel.y;
  }

  public getValues(): ObjectInfoMessage{
    return {
      position:{
        x: this.position.x,
        y: this.position.y
      },
      vel:{
        x: this.velocity.x,
        y: this.velocity.y
      },
      accel:{
        x: this.accel.x,
        y: this.accel.y
      },
      symbol: this.symbol,
      width: this.width,
      height: this.height,
      id: this.id
    }
  }

  public jump():AbstractThing{
    this.velocity.y = -15
    return this
  }
}