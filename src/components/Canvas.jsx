import React, {useEffect,useRef } from 'react';

function Canvas() {
  //获取canvas元素节点
  const canvasRef = useRef(null);
  let ctx
  const width = 300
  const height = 150
  useEffect(() => {
    init()
  })

  const init = () => {
    const canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
    ctx.fillStyle = "#70cccc"
    ctx.strokeStyle = "#b2f0d0"
    ctx.fillRect(0, 0, width, height)

    const branch1 = {
    start: { x: 0, y: 20 },
    length: 5,
    theta: Math.PI / 4
    }
    const branch2 = {
    start: { x: width, y: 130 },
    length: 5,
    theta: -Math.PI / 4*3
    }
    step(branch1)
    step(branch2)
  }

  const pendingTasks = []

  function step(b,depth=0) {
    const end = getEndPoint(b)
      drawLine(b)
    
    if (depth < 3 || Math.random() < 0.5) {
      pendingTasks.push(()=>step({
      start: end,
      length: b.length+(Math.random()*10-5),
      theta:b.theta-0.3*Math.random()
      },depth+1))
    }

    if (depth < 3 || Math.random() < 0.5) {
      pendingTasks.push(()=>step({
      start: end,
      length: b.length+(Math.random()*5),
      theta:b.theta+0.3*Math.random()
      },depth+1))
    }

  }
  function frame() {
    const tasks =[...pendingTasks]
    pendingTasks.length = 0
    tasks.forEach(fn=>fn())
  }

  let framesCount = 0
  function startFrame(){
    requestAnimationFrame(() => {
      framesCount += 1
      if(framesCount%10===0)
        frame()
      startFrame()
    })
  }

  startFrame()

  function lineTo(p1, p2) {
    ctx.beginPath()
    ctx.moveTo(p1.x,p1.y )
    ctx.lineTo(p2.x,p2.y)
    ctx.stroke()
  }

  function drawLine(line) {
    const end = {
      x: line.start.x + line.length * Math.cos(line.theta),
      y: line.start.y + line.length * Math.sin(line.theta),
    }
    lineTo(line.start,end)
  }

  function getEndPoint(b) {
    return {
      x:b.start.x + b.length * Math.cos(b.theta),
      y:b.start.y + b.length * Math.sin(b.theta)
    }
  }
  return (
    <canvas id='canvas' ref={canvasRef}></canvas>
  )
}

export default Canvas