let tubi = [];
let numtub = 0;
let distbord = 50;
let mP = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background(0, 0, 0);
  rectMode(CENTER);

  numtub = random(2, 5);

  for (let i = 0; i < numtub; i++) {
    tubi.push(
      new tube(
        random(0, width - distbord),
        random(0, height - distbord),
        round(random(10, 15)),
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
        round(random(10, 15)),
        random(1, 4)
      )
    );
  }
  if (tubi.length > 35 && round(random(0, 50)) == 24) {
    tubi.pop();
  }
  if (tubi.length > 40 && round(random(0, 50)) == 23) {
    tubi.pop();
  }

  background(0, 0, 0, 5);
  if (frameCount % round(random(15, 25)) == 0) {
    background(0, 0, 0, random(15, 25));
    textFont("Silkscreen");
    textSize(17);
    if (mouseIsPressed == false) {
      text(
        "You can grab the squares if you want",
        random(width),
        random(height)
      );
    } else {
      text(
        "sooner or later stop and release them",
        random(width),
        random(height)
      );
    }
  }

  for (let i = 0; i < tubi.length; i++) {
    tubi[i].move();

    if (
      tubi[i].x < mouseX + 50 &&
      tubi[i].x > mouseX - 50 &&
      tubi[i].y < mouseY + 50 &&
      tubi[i].y > mouseY - 50 &&
      mouseIsPressed == true
    ) {
      tubi[i].case = 5;
    }
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
    rect(this.x, this.y, this.a);

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
      case 5:
        this.x = mouseX;
        this.y = mouseY;
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
