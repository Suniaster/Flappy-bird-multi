


interface Point{
  x:number,
  y:number
}

interface socketEvent{
  name: string,
  callback: (data)=>{}
}

interface ObjectPositionMessage{
  position:{
    x:number,
    y:number
  },
  symbol:string,
  width: number,
  height: number
}