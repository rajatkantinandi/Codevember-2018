var stars = [];

var speed = 5;
var hyperspeed = false;
var maxSpeed = 300;
document.getElementById("hyper").addEventListener("click", function() {
    if (hyperspeed) {
        this.style.background = "red";
        hyperspeed = false;
        unhyper();
    } else {
        this.style.background = "green";
        hyperspeed = true;
        hyper();
    }
});

function hyper() {
    if (speed < maxSpeed / 4) {
        speed += maxSpeed / 20;
        setTimeout(hyper, 100);
    } else speed = maxSpeed;
}

function unhyper() {
    if (speed > maxSpeed / 10) {
        speed -= maxSpeed / 10;
        setTimeout(unhyper, 50);
    } else setup();
}

function setup() {
    createCanvas(600, 600);
    for (var i = 0; i < 800; i++) {
        stars[i] = new Star();
    }
    speed = 5;
}

function draw() {
    background(0);
    frameRate(40);
    translate(width / 2, height / 2);
    for (var i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].show();
    }
}

function Star() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    this.pz = this.z;

    this.update = function() {
        this.z = this.z - speed;
        if (this.z < 1) {
            this.z = width;
            this.x = random(-width, width);
            this.y = random(-height, height);
            this.pz = this.z;
        }
    };

    this.show = function() {
        fill(255);
        noStroke();

        var sx = map(this.x / this.z, -1, 1, -width, width);
        var sy = map(this.y / this.z, -1, 1, -height, height);

        var r = map(this.z, 0, width, 12, 1);
        ellipse(sx, sy, r, r);

        var px = map(this.x / this.pz, -1, 1, -width, width);
        var py = map(this.y / this.pz, -1, 1, -height, height);

        this.pz = this.z;

        stroke(255);
        line(px, py, sx, sy);
    };
}