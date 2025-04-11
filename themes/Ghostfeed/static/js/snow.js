let snowflakes = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1'); // Behind everything
  noStroke();
  fill(255); // White snow
}

function draw() {
  clear(); // Clears canvas without affecting CSS background

  let t = frameCount * 0.01;

  // Add new snowflakes
  for (let i = 0; i < random(1, 3); i++) {
    snowflakes.push(new Snowflake());
  }

  // Update and display snowflakes
  for (let flake of snowflakes) {
    flake.update(t);
    flake.display();
  }

  // Remove flakes below screen
  snowflakes = snowflakes.filter(flake => flake.posY < height + flake.size);
}

class Snowflake {
  constructor() {
    this.posX = random(width);
    this.posY = random(-50, 0);
    this.size = random(1, 3);
    this.fallSpeed = map(this.size, 1, 3, 0.5, 2);
    this.xOffset = random(1000); // for noise seed
  }

  update(time) {
    this.posY += this.fallSpeed;
    // Wind drift via Perlin noise
    let n = noise(this.xOffset, time);
    let wind = map(n, 0, 1, -1.5, 1.5);
    this.posX += wind;
    this.xOffset += 0.005; // slowly evolve noise seed
  }

  display() {
    ellipse(this.posX, this.posY, this.size);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
