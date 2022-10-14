let tubi = []; //array that contains the objects moving
let numtub = 0; //initial number of the balls
let distbord = 20; //distance from the border in wich the ball bounce

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background(0, 0, 0);

  numtub = random(2, 5);

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
  if (round(random(0, 50)) == 25) {
    tubi.push(
      new tube(
        random(0, width - distbord),
        random(0, height - distbord),
        round(random(10, 50)),
        random(1, 4)
      )
    );
  }
  if (tubi.length > 15 && round(random(0, 50)) == 24) {
    tubi.pop();
  }

  background(0, 0, 0, 5);
  if (frameCount % round(random(15, 25)) == 0) {
    background(0, 0, 0, random(15, 25));
  }

  for (let i = 0; i < tubi.length; i++) {
    tubi[i].move();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0, 0, 0);
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
        this.v = this.v + random(-0.05, 0.05);
        break;
      case 2:
        this.x -= this.v;
        this.v = this.v + random(-0.05, 0.05);
        break;
      case 3:
        this.y += this.v;
        this.v = this.v + random(-0.05, 0.05);
        break;
      case 4:
        this.y -= this.v;
        this.v = this.v + random(-0.05, 0.05);
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
