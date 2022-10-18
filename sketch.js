let tubi = [];
let numtub = 0;
let distbord = 50;
let mP = false;
let diam = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background(0, 0, 0);
  rectMode(CENTER);
  textAlign(CENTER);
  textFont("Silkscreen");
  textSize(17);

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

    if (mouseIsPressed == false) {
      text("press to call the squares", random(width), random(height));
    } else {
      text(
        "before or after release the squares",
        random(width),
        random(height)
      );
    }
  }

  for (let i = 0; i < tubi.length; i++) {
    if (mouseIsPressed == true) {
      noFill();
      stroke("white");
      ellipse(mouseX, mouseY, diam);
      if (diam <= 0) {
        diam = 100;
      } else {
        diam = diam - 0.02;
      }

      if (tubi[i].x < mouseX - 10) {
        tubi[i].case = 1;
      } else if (tubi[i].y > mouseY + 10) {
        tubi[i].case = 4;
      } else if (tubi[i].y < mouseY - 10) {
        tubi[i].case = 3;
      } else if (tubi[i].x > mouseX + 10) {
        tubi[i].case = 2;
      }
    } else {
      diam = 100;
    }

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
