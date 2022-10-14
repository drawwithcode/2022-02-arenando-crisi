let tubi = [];
let numtub = 25;
let distbord = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background(0, 0, 0);

  for (let i = 0; i < numtub; i++) {
    tubi.push(
      new tube(
        random(0, width - distbord),
        random(0, height - distbord),
        round(random(10, 50)),
        random(1, 4)
      )
    );
  }
}

function draw() {
  background(0, 0, 0, 5);
  for (let i = 0; i < tubi.length; i++) {
    tubi[i].move();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class tube {
  constructor(xiniz, yiniz, amp, velocity) {
    this.x = xiniz;
    this.y = yiniz;
    this.a = amp;
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.case = 1;
    this.time = 0;
    this.count = 0;
    this.v = velocity;
  }

  move() {
    fill(this.r, this.g, this.b);
    noStroke();
    circle(this.x, this.y, this.a);

    if (this.count == this.time) {
      this.time = round(random(100, 200));
      this.count = 0;
      this.case = round(random(1, 4));
    }

    switch (this.case) {
      case 1:
        this.x += this.v;
        break;
      case 2:
        this.x -= this.v;
        break;
      case 3:
        this.y += this.v;
        break;
      case 4:
        this.y -= this.v;
        break;
    }

    if (this.x > width - distbord) {
      this.case = 2;
    }

    if (this.x < distbord) {
      this.case = 1;
    }

    if (this.y > height - distbord) {
      this.case = 4;
    }

    if (this.y < distbord) {
      this.case = 3;
    }
    this.count++;
  }
}
