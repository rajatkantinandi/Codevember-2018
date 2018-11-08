var jellyFish;
function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  jellyFish = new JellyFish(200, 200);
}

function draw() {
  loadPixels();
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      var index = (i + j * width) * 4;
      pixels[index] = 50;
      pixels[index + 1] = 50;
      pixels[index + 2] = 230;
      pixels[index + 3] = j * 0.7 + 30;
    }
  }
  updatePixels();
  jellyFish.draw();
  jellyFish.update();
}
function JellyFish(x, y) {
  this.x = x;
  this.y = y;
  this.w = 300;
  this.h = 150;
  this.d = 0;
  this.draw = function() {
    noStroke();
    fill(250, 160, 100);
    push();
    translate(x, y);
    beginShape();
    vertex(-this.w / 2, 0);
    curveVertex(-this.w / 4 - this.d, -this.h / 2);
    curveVertex(0, -this.h);
    curveVertex(this.w / 4 + this.d, -this.h / 2);
    vertex(this.w / 2, 0);
    endShape();
    pop();
  };
  this.update = function() {
    var change = this.w / 300;
    if (this.d <= 0) {
      change = this.w / 300;
    } else if (this.d >= this.w / 5) {
      change = -this.w / 300;
    }
    this.d += change;
  };
}
