const points = [
  new p5.Vector(0.825, 0.78),
  new p5.Vector(0.835, 0.56),
  new p5.Vector(0.3725, 0.54),
  new p5.Vector(0.4125, 0.415),
  new p5.Vector(0.5425, 0.722),
  new p5.Vector(0.7375, 0.35),
  new p5.Vector(0.13, 0.305),
  new p5.Vector(0.2525, 0.1825)
]

let slope = 1
let intercept = 0

function setup() {
  createCanvas(windowWidth, windowHeight)
  background(51)
  stroke(255)
  strokeWeight(8)

  for (const p of points) {
    point(map(p.x, 0, 1, 0, width), map(p.y, 0, 1, height, 0))
  }
}

function draw() {
  strokeWeight(2)
  olsRegression(points)
  drawLine(slope, intercept)
}

function drawLine(s, i) {
  let x1 = 0
  let y1 = s * x1 + i
  let x2 = 1
  let y2 = s * x2 + i
  
  x1 = map(x1, 0, 1, 0, width)
  y1 = map(y1, 0, 1, height, 0)
  x2 = map(x2, 0, 1, 0, width)
  y2 = map(y2, 0, 1, height, 0)
  
  stroke(255, 0, 255)
  line(x1, y1, x2, y2)
}

function olsRegression(points) {
  const xsum = points.reduce((acc, v) => acc + v.x, 0)
  const ysum = points.reduce((acc, v) => acc + v.y, 0)
  const xmean = xsum/points.length
  const ymean = ysum/points.length
  
  const num = points.map(p => (p.x-xmean) * (p.y-ymean)).reduce((acc, v) => acc + v, 0)
  const den = points.map(p => (p.x-xmean) * (p.x-xmean)).reduce((acc, v) => acc + v, 0)

  slope = num/den
  intercept = ymean-slope*xmean 
}