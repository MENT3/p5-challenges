function generateRandomColor() {
  const r = random(255)
  const g = random(60, 200)
  const b = random(180, 255)
  return [r, g, b]
}

function olsRegression(points) {
  const xsum = points.reduce((acc, v) => acc + v.x, 0)
  const ysum = points.reduce((acc, v) => acc + v.y, 0)
  const xmean = xsum/points.length
  const ymean = ysum/points.length
  const num = points.map(p => (p.x-xmean) * (p.y-ymean)).reduce((acc, v) => acc + v, 0)
  const den = points.map(p => (p.x-xmean) * (p.x-xmean)).reduce((acc, v) => acc + v, 0)

  const s = num/den
  const i = ymean-s*xmean 
  return [s, i]
}

function drawRegressionLine(s, i) {
  let x1 = 0
  let y1 = s * x1 + i
  let x2 = 1
  let y2 = s * x2 + i
  
  x1 = map(x1, 0, 1, 0, width)
  y1 = map(y1, 0, 1, height, 0)
  x2 = map(x2, 0, 1, 0, width)
  y2 = map(y2, 0, 1, height, 0)
  
  strokeWeight(2)
  stroke('red')
  line(x1, y1, x2, y2)
}

function drawErrors(points, s, i) { 
  stroke('purple')
  for (const p of points) {
    const x = map(p.x, 0, 1, 0, width)
    const y = map(p.y, 0, 1, height, 0)
    const regY = map(s * p.x + i, 0, 1, height, 0)

    strokeWeight(0)
    fill(...generateRandomColor())
    square(x, regY, y-regY)
  }
}

function setup() {
  // TODO clean it
  const points = Array(10).fill(0).map(p => new p5.Vector(random(0.1, 0.9), random(0.2, 0.8)))
  createCanvas(windowWidth, windowHeight)

  const [slope, intercept] = olsRegression(points)
  drawRegressionLine(slope, intercept)
  drawErrors(points, slope, intercept)

  stroke(80)
  strokeWeight(8)
  for (const p of points) {
    point(map(p.x, 0, 1, 0, width), map(p.y, 0, 1, height, 0))
  }
}
