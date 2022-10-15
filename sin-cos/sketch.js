const r = 150

function setup() {
  createCanvas(windowWidth, windowHeight)
}

function draw() {
  background(255)
  translate(width/2, height/2)

  strokeWeight(2)
  noFill()
  circle(0, 0, r*2)

  strokeWeight(10)

  const angle = millis()/1000 
  const x = r * cos(angle)
  const y = r * sin(angle)
  point(x, y)

  strokeWeight(2)
  fill(253, 218, 13)
  triangle(0, 0, x, 0, x, y)

  strokeWeight(10)
  stroke(0, 255, 0)
  point(r, y)
  stroke(255, 0, 0)
  point(x, r)
  stroke(0)
}
