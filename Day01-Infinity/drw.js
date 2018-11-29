var f = 1,
  inc = -1,
  hue1 = 0,
  hue2 = 360;
function setup() {
  createCanvas(400, 400);
  noFill();
  strokeWeight(10);
  frameRate(60);
  colorMode(HSB);
}

function draw() {
  background(0, 0, 0);
  if (f <= -0.5) inc = 1;
  else if (f >= 1.5) inc = -1;
  f += inc * 0.04;
  if (f >= 0 && f <= 1) drawInfinity(f);
  else if (f > 1) {
    hue1 = random(0, 360);
    stroke(hue2, 100, 100);
    drawInfinity(1);
  } else if (f < 0) {
    hue2 = random(0, 360);
    stroke(hue1, 100, 100);
    drawInfinity(0);
  }
}
function drawInfinity(f) {
  arc(120, 200, 90, 90, PI - (3 * f * HALF_PI) / 2, PI + (f * 3 * HALF_PI) / 2);
  line(200 - 50 * f, 200 - 34 * f, 200 + f * 50, 200 + f * 34);
  line(200 + f * 50, 200 - 34 * f, 200 - 50 * f, 200 + f * 34);
  arc(280, 200, 90, 90, (-f * HALF_PI * 3) / 2, (f * HALF_PI * 3) / 2);
}
