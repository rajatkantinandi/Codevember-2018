var particles = [];
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  translate(200, 200);
  noStroke();
  for (var i = 40; i >= 0; i--) {
    var r = i * random(5, 6) + 50;
    var angle = random(0, 360);
    for (var j = 50; j >= 0; j--) {
      r -= 0.1;
      angle += random(2, 9);
      particles.push(new Particle(r, angle, random(1, 5)));
    }
  }
  frameRate(20);
}
function draw() {
  background(0);
  translate(200, 200);
  var r = 210;
  for (var i = particles.length - 1; i >= 0; i--) {
    if (particles[i].r < random(20, 25)) {
      particles[i].r = r;
    } else {
      particles[i].update();
      particles[i].show();
    }
  }
}
function Particle(r, theta, size) {
  this.r = r;
  this.theta = theta;
  this.size = size;
  this.update = function() {
    this.r -= random(0.5, 0.8) / Math.log10(this.r * 2);
    this.theta += random(0.7, 1.2) / Math.log10(this.r / 5);
  };
  this.show = function() {
    fill(255, Math.min(2 * this.r, 255));
    ellipse(this.r * sin(this.theta), this.r * cos(this.theta), this.size);
  };
}
