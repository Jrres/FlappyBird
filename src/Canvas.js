
import React, { useRef, useEffect } from 'react'
import Spacebar, { getSpace } from "./Spacebar"




const Canvas = (props) => {
  

  const bg = new Image();   // Create new img element
  let physics ={
  'gravity' : 9.8,
  'accel' : 0,
  'timepassed' : 0
  }
 let gamestate={
  '1':'start',
  '2':'lost'
 }
  let botheight =350;


  let pos = 500; 
  let ypos = 450;//object pos
  let starty= 450;
  console.log("(width,height)=("+window.screen.width + "," + window.screen.height+")")
  let key = false;
  const canvasRef = useRef(null)

  let counter  =  (oldcount)=>{
    return oldcount+1
  }; 
  const draw = (ctx, startpos) => {//caled once to create object
   
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(startpos, ypos, 20*Math.sin(360)**2, 0, 2*Math.PI)
    ctx.fill()  
    return ctx;
  }
  const update = (newctx)=>
  {//called repeatedly to change ctx properties
    console.log("(x,y)=("+pos + "," + ypos+")")
    let top = ypos>=jump(starty) 
    let bot= ypos<1050

    if('start'==gamestate[1]){
    newctx.beginPath()
    newctx.fillText("Press Space", 0, 0, 1000)
    
    }
    if(top && bot ) 
    { 
      newctx.fillStyle = '#000000'
      newctx.beginPath()
      newctx.arc(pos, ypos+=5, 20*Math.sin(360)**2, 0, 2*Math.PI)
      newctx.fill()
    }
    if(!top){
      newctx.fillStyle = '#000000'
      newctx.beginPath()
      newctx.arc(pos, ypos=jump(starty)+20, 20*Math.sin(360)**2, 0, 2*Math.PI)
      newctx.fill()
    }
    if(!bot){
      newctx.fillStyle = '#000000'
      newctx.beginPath()
      newctx.arc(pos, ypos-=5, 20*Math.sin(360)**2, 0, 2*Math.PI)
      newctx.fill()
    }
    if(key=getSpace())
    {
      newctx.fillStyle = '#000000'
      newctx.beginPath()
      newctx.arc(pos, ypos-=15, 20*Math.sin(360)**2, 0, 2*Math.PI)
      newctx.fill()
    
  }  
 }
  let Xpos=2000,YposBot=1080,YposTop = 0;
  let randheight = 200
 console.log("the ypos is :"+YposBot)
    const obstBot = (ctx) =>{ 
      
        console.log("CREATED BOTTOM PIPE ___________| |__________")
        
        ctx.fillStyle = '#100000'
        ctx.beginPath()
        ctx.fillRect(Xpos, YposBot, 100, 200);
        ctx.fill()  
        
        return ctx;
    }
    const obstTop = (ctx) =>{ 
      randheight = (Math.random()* (150)+200)//right now the heights are symmetrical
      
      ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.fillRect(Xpos, YposTop, 100, randheight);
        ctx.fill()  
        return ctx;
    }
    const updateTop=(ctx,pos)=>{
     
      if(Xpos>=-100){
        ctx.fillStyle = "#FF0000";
        ctx.beginPath()
        ctx.fillRect(Xpos-=pos, YposTop, 100, randheight);
        ctx.fill()
        counter(1)
      }  
      else{
        randheight = (Math.random() * (150)+ 200)
        botheight=randheight+ 250  
        Xpos=2000-pos
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.fillRect(Xpos, YposTop, 100, randheight);
        ctx.fill()
      }

    }
    const updateBot=(ctx,pos)=>{
   
      if(Xpos>=-100){
        ctx.fillStyle = "#FF0000";
        ctx.beginPath()
        console.log( "the val of botheight is : "+ -botheight)
        ctx.fillRect(Xpos-=pos, YposBot, 100, -botheight);
        ctx.fill()  
      }
      else{
        ctx.beginPath()       
        ctx.fillRect(Xpos-=pos, YposBot, 100, -botheight);
        ctx.fill()  
      }
    }
    
// bird moves in x dir when game state is on
  let xpos = (currpos,frameCount) => {//change this to a constant pos(init)=v*t 
    let velocity = .5
    currpos+=frameCount*velocity;
    return currpos;
  }
  let jump = (currPosY)=>{//call this when addevent handler press space bar 

      //y1 = y0 + v0yt+1/2at^2
      let vInit = 50;
      let g = 9.8 //vf^2=vi^2+2ad / vf = vi+at -> -vi/-g = t at top
      let tAtMax = vInit/g
      
      let height = currPosY+vInit*tAtMax+1/2*g*Math.pow(2,tAtMax)
      return currPosY+(currPosY-height);
  }
 
 
  
 // const [x, y] = useState(0);//sets the state of an object after clicking or pressing something
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.canvas.width=window.screen.width
    context.canvas.height=window.screen.height

    bg.src= 'https://wallpaperaccess.com/full/8090723.jpg'
      
    context.drawImage(bg,window.screen.width,window.screen.height)
    console.log(bg)

    let animationFrameId
    
    let newctx =draw(context,pos)
    let pipeBot = obstBot(context)
    let pipeTop = obstTop(context)

 
    //Our draw came here
    const render = () => {

      let newx = 0//xpos(pos,frameCount)
      context.clearRect(0, 0, context.canvas.width, context.canvas.height)
      
     
      context.drawImage(bg,0,0,window.screen.width,window.screen.height)  
      update(newctx)//bird
      updateTop(pipeBot,2)
      updateBot(pipeTop,2)
      
      
 
      
    
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw,obstBot,obstTop])
  
  return <div>
    <h1>Developed By Jrres</h1> 
        <canvas ref={canvasRef}  {...props}/>
        <Spacebar />
        <h1>{"level " + counter(0)}</h1> 
        </div>
}
export default Canvas 
