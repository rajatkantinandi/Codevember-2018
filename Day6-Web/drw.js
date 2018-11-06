var spider;
function setup() {
  createCanvas(400, 500);
  spider = new Spider(200, 250);
  angleMode(DEGREES);
}
function draw() {
  background(0);
  spider.show();
}
function Spider(x, y) {
  this.pos = createVector(x, y);
  this.show = function() {
    var bh = 40,
      bw = 35,
      hh = 25,
      hw = 20;
    fill(255);
    translate(this.pos.x, this.pos.y);
    ellipse(0, -bh / 2 - hh / 4, hw, hh); //head
    ellipse(0, 0, bw, bh); //body
    this.drawLeg(bw / 3, 10, 40, 45, 70, 80); //right bottom
    this.drawLeg(bw / 2, 3, 10, -15, 50, 40); //right 2nd bottom
    this.drawLeg(bw / 2, -3, -10, -15, 55, 50); //right 2nd top
    this.drawLeg(bw / 3, -10, -40, -45, 55, 70); //right top

    this.drawLeg(-bw / 3, 10, 180 - 40, -45, 70, 80); //left bottom
    this.drawLeg(-bw / 2, 3, 180 - 10, 15, 50, 40); //left 2nd bottom
    this.drawLeg(-bw / 2, -3, 180 + 10, 15, 55, 50); //left 2nd top
    this.drawLeg(-bw / 3, -10, 180 + 40, 45, 55, 70); //left top
  };
  this.drawLeg = function(x, y, rot1, rot2, h1, h2) {
    var lw = 5;
    push();
    translate(x, y);
    rotate(rot1);
    ellipse(h1 / 2, 0, h1, lw);
    translate(h1, 0);
    rotate(rot2);
    ellipse(h2 / 2, 0, h2, lw);
    pop();
  };
  this.move = function(x, y) {
    this.pos.x += x;
    this.pos.y += y;
  };
}
