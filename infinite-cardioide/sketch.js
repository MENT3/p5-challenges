let r
let factor = 0

function setup() {
  background(0)
  createCanvas(windowWidth, windowHeight)
  r = width / 2 - 16
}

function getVector(index, total) {
  const angle = map(index%total, 0, total, 0, TWO_PI)
  const v = p5.Vector.fromAngle(angle + PI)
  return v.mult(r/2)
}

function draw() {
  background(255)
  const total = 200
  factor += 0.015

  translate(width/2, height/2)
  stroke(0, 150)
  strokeWeight(2)
  noFill()
  ellipse(0, 0, r)

  for(let i=0; i < total; i++) {
    const a = getVector(i, total)
    const b = getVector(i * factor, total)
    line(a.x, a.y, b.x, b.y)
  }
}
