
import React, { useRef, useEffect } from 'react'
import Spacebar, { getSpace } from "./Spacebar"




const Canvas = (props) => {
  

  const bg = new Image();   // Create new img element
  let gravity = 9.8;
  let accel =0;
  let timepassed = 0;
  let pos = 500; 
  let ypos = 450;//object pos
  let starty= 450;
  console.log("(width,height)=("+window.screen.width + "," + window.screen.height+")")
  let key = false;
  const canvasRef = useRef(null)

  const draw = (ctx, startpos) => {//caled once to create object
   
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(startpos, ypos, 20*Math.sin(360)**2, 0, 2*Math.PI)
    ctx.fill()  
    return ctx;
  }
  const update = (newctx,newpos)=>{//called repeatedly to change objects properties
    console.log("(x,y)=("+pos + "," + ypos+")")
    if(key=getSpace()){
      setInterval(function(){ 
        accel = gravity*=timepassed;
        timepassed++
    }, 2000);
        
      if(ypos>=jump(starty) && ypos<=1000){//max
        
          
          newctx.fillStyle = '#000000'
          newctx.beginPath()
          newctx.arc(pos, ypos-=5*accel, 20*Math.sin(360)**2, 0, 2*Math.PI)
          newctx.fill()


          if( key ){
            newctx.fillStyle = '#000000'
          newctx.beginPath()
          newctx.arc(pos, ypos+=5*-accel, 20*Math.sin(360)**2, 0, 2*Math.PI)
          newctx.fill()
          }
          
      }
      
      else{
      
          newctx.fillStyle = '#000000'
          newctx.beginPath()
          newctx.arc(pos, ypos+=5, 20*Math.sin(360)**2, 0, 2*Math.PI)
          newctx.fill()
          key =-key
      }
    }
    else{ 
      newctx.fillStyle = '#000000'
          newctx.beginPath()
          newctx.arc(pos, ypos+=5, 20*Math.sin(360)**2, 0, 2*Math.PI)
          newctx.fill()
          key =-key
    }
    
  }

  let Xpos=2000,YposBot=905,YposTop = 505;
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
      
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.fillRect(Xpos, YposTop, 100, 200);
        ctx.fill()  
        return ctx;
    }
    const updateTop=(ctx,pos)=>{

      if(Xpos>=-100){
        ctx.fillStyle = "#FF0000";
        ctx.beginPath()
        ctx.fillRect(Xpos-=pos, YposTop, 100, 200);
        ctx.fill()
      }  
      else{
        YposTop =(Math.random() * (560 - 200) + 200)
        Xpos=2000
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.fillRect(Xpos-=pos, YposTop, 100, 200);
        ctx.fill()
      }

    }
    const updateBot=(ctx,pos)=>{
      if(Xpos>=-100){
        ctx.fillStyle = "#FF0000";
        ctx.beginPath()
        ctx.fillRect(Xpos-=pos, YposBot, 100, 200);
        ctx.fill()  
      }
      else{
        YposBot=(Math.random() * (1000 - 705) + 705)
        ctx.beginPath()
        ctx.fillRect(Xpos-=pos, YposBot, 100, 200);
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
      if(getSpace()){
        const height=jump(ypos)
      }
     
      newctx.clearRect(0, 0, newctx.canvas.width, newctx.canvas.height)
      
     
      context.drawImage(bg,0,0,window.screen.width,window.screen.height)  
      update(newctx,newx)//bird
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
    <h1>Developed By Jress</h1> 
        <canvas ref={canvasRef}  {...props}/>
        <Spacebar />

        </div>
}
export default Canvas 
