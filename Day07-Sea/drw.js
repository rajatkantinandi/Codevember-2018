var jellyFish;

function setup() {
    createCanvas(500, 500);
    pixelDensity(1);
    jellyFish = new JellyFish(250, 100);
}

function draw() {
    loadPixels();
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            var index = (i + j * width) * 4;
            pixels[index] = 0;
            pixels[index + 1] = 50;
            pixels[index + 2] = 230;
            pixels[index + 3] = j * 0.3 + 30;
        }
    }
    updatePixels();
    jellyFish.draw();
    jellyFish.update();
}

function JellyFish(x, y) {
    this.x = x;
    this.y = y;
    this.w = 200;
    this.h = 70;
    this.d = 0;
    this.change = this.w / 1000;
    this.dd = this.d + this.change;
    this.draw = function() {
        stroke(0, 20, 255);
        fill(60, 200, 250);
        push();
        translate(this.x, this.y);
        beginShape();
        vertex(-this.w / 2, 0);
        curveVertex(-this.w / 2, 0);
        curveVertex(-this.w / 6 - this.d, -4 * this.h / 7);
        curveVertex(0, -this.h);
        curveVertex(this.w / 6 + this.d, -4 * this.h / 7);
        curveVertex(this.w / 2, 0);
        vertex(this.w / 2, 0);
        endShape();
        fill(60, 150, 255);
        ellipse(0, 0, this.w, this.h / 3 + this.d / 3);
        var marks = [
            [0, 0.5, 1 / 6],
            [1 / 6, 1 / 3, 1 / 9],
            [-1 / 8, 3 / 7, 1 / 10],
            [-1 / 3, 1 / 5, 1 / 10],
            [-1 / 15, 1 / 4, 1 / 10],
            [-1 / 4, 1 / 4, 1 / 10],
            [1 / 3, 1 / 5, 1 / 10],
            [1 / 30, 5 / 7, 1 / 10]
        ];
        for (var i = 0; i < marks.length; i++) {
            fill(200);
            ellipse(
                this.w * marks[i][0], -this.h * marks[i][1] - this.d / 3,
                this.h * marks[i][2],
                this.h * marks[i][2]
            );
        }
        var tentacles = [
            [0, 3 + this.d / 45, -1 / 20 + this.d / 550, 1, 1 / 20, 2, 0.8],
            [1 / 10, 3 + this.d / 35, -1 / 11 + this.d / 550, 1.3, 1 / 11, 2.2, 1],
            [1 / 5, 3 + this.d / 35, 1 / 12 + this.d / 550, 1, 1 / 7, 2.5, 0.6],
            [1 / 3, 3.5 + this.d / 45, 1 / 7 + this.d / 550, 1, 1 / 4, 2.2, 0.8],
            [3 / 7, 3.2 + this.d / 45, 1 / 3 + this.d / 550, 1, 1 / 5, 2.3, 0.7],
            [-1 / 10, 3 + this.d / 35, -1 / 11 + this.d / 550, 1.3, 1 / 11, 2.2, 1],
            [-1 / 5, 3 + this.d / 35, -1 / 12 + this.d / 550, 1, -1 / 7, 2.5, 0.6],
            [-1 / 3, 3.5 + this.d / 45, -1 / 7 + this.d / 550, 1, -1 / 4, 2.2, 0.8],
            [-2.7 / 7, 3.2 + this.d / 45, -1 / 3 + this.d / 550, 1, -1 / 5, 2.3, 1],
            [-3 / 7, 3.2 + this.d / 45, -1.3 / 3 + this.d / 550, 1, -1 / 4, 2.3, 1]
        ];
        for (var i = 0; i < tentacles.length; i++) {
            beginShape();
            strokeWeight(6);
            stroke(150, 220, 255 * tentacles[i][tentacles[i].length - 1]);
            noFill();
            vertex(
                this.w * tentacles[i][0], -tentacles[i][tentacles[i].length - 1] * this.h / 15
            );
            curveVertex(
                this.w * tentacles[i][0], -tentacles[i][tentacles[i].length - 1] * this.h / 15
            );
            for (var j = 2; j < tentacles[i].length - 1; j += 2) {
                curveVertex(this.w * tentacles[i][j], this.h * tentacles[i][j + 1]);
            }
            curveVertex(this.w * tentacles[i][0], this.h * tentacles[i][1]);
            vertex(this.w * tentacles[i][0], this.h * tentacles[i][1]);
            endShape();
        }
        pop();
    };
    this.update = function() {
        if (this.dd <= this.w / 45) {
            this.change = this.w / 1000;
        } else if (this.dd >= this.w / 3) {
            this.change = -this.w / 500;
        }
        if (this.dd > this.w / 25 && this.dd < this.w / 5) this.d += this.change;
        this.dd += this.change;
        this.y += this.change;
    };
}