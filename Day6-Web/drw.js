var spider;
var velocityChangex = 1;
var velocityChangey = 1;

function setup() {
    createCanvas(500, 500);
    spider = new Spider(150, 250);
    angleMode(DEGREES);
    frameRate(20);
}

function draw() {
    background(0);
    drawWeb(250, 250);
    if (frameCount % 30 == 0) {
        spider.velocity.x += velocityChangex;
        spider.velocity.y += velocityChangey;
        if (spider.velocity.x > 10) {
            velocityChangex = -1;
        } else if (spider.velocity.x <= -10) {
            velocityChangex = 1;
        }
        if (spider.velocity.y > 10) {
            velocityChangey = -1;
        } else if (spider.velocity.y <= -10) {
            velocityChangey = 1;
        }
    }
    spider.show();
    spider.move();
}

function Spider(x, y) {
    this.pos = createVector(x, y);
    this.legAngles = [
        [40, 45],
        [10, -15],
        [-10, -15],
        [-40, -45]
    ];
    this.legMovement = [5, 4, 7, 6];
    this.countLegMov = 0;
    this.velocity = createVector(0, -11);
    this.show = function() {
        var bh = 13,
            bw = 12,
            hh = 8,
            hw = 7,
            la = this.legAngles;
        fill(255);
        translate(this.pos.x, this.pos.y);
        rotate(acos(-this.velocity.y / this.velocity.mag()));
        ellipse(0, -bh / 2 - hh / 4, hw, hh); //head
        ellipse(0, 0, bw, bh); //body
        this.drawLeg(bw / 3, 3, la[0][0], la[0][1], 23, 27); //right bottom
        this.drawLeg(bw / 2, 1, la[1][0], la[1][1], 17, 13); //right 2nd bottom
        this.drawLeg(bw / 2, -1, la[2][0], la[2][1], 18, 17); //right 2nd top
        this.drawLeg(bw / 3, -3, la[3][0], la[3][1], 18, 23); //right top

        this.drawLeg(-bw / 3, 3, 180 - la[0][0], -la[0][1], 23, 27); //left bottom
        this.drawLeg(-bw / 2, 1, 180 - la[1][0], -la[1][1], 17, 13); //left 2nd bottom
        this.drawLeg(-bw / 2, -1, 180 - la[2][0], -la[2][1], 18, 17); //left 2nd top
        this.drawLeg(-bw / 3, -3, 180 - la[3][0], -la[3][1], 18, 23); //left top
    };
    this.drawLeg = function(x, y, rot1, rot2, h1, h2) {
        var lw = 3;
        push();
        translate(x, y);
        rotate(rot1);
        ellipse(h1 / 2, 0, h1, lw);
        translate(h1, 0);
        rotate(rot2);
        ellipse(h2 / 2, 0, h2, lw);
        pop();
    };
    this.move = function() {
        if (frameCount % 10 == 0) {
            this.countLegMov++;
            this.pos.x += this.velocity.x / 2;
            this.pos.y += this.velocity.y / 2;
            for (var i = 0; i < this.legAngles.length; i++) {
                for (var j = 0; j < 2; j++) {
                    this.legAngles[i][j] +=
                        this.legMovement[i] * pow(-1, this.countLegMov);
                }
            }
        }
    };
}

function drawWeb(x, y) {
    push();
    strokeWeight(1);
    stroke(150);
    translate(x, y);
    for (i = 0; i < 25; i++) {
        drawPentagon(i * 15);
    }
    strokeWeight(2);
    drawLines(0, 0, 300);
    pop();
}

function drawPentagon(r) {
    line(0, -r, r * sin(72), -r * cos(72));
    line(r * sin(72), -r * cos(72), r * cos(54), r * sin(54));
    line(r * cos(54), r * sin(54), -r * sin(36), r * cos(36));
    line(-r * sin(36), r * cos(36), -r * cos(18), -r * sin(18));
    line(-r * cos(18), -r * sin(18), 0, -r);
}

function drawLines(x, y, r) {
    line(x, y, 0, -r);
    line(x, y, r * cos(54), r * sin(54));
    line(x, y, -r * sin(36), r * cos(36));
    line(x, y, -r * cos(18), -r * sin(18));
    line(x, y, r * sin(72), -r * cos(72));
}