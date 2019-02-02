var stars = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < width; i++){
    stars[i]= new Star();
  }
  frameRate(10);
}

function draw() {
  background(0);
  for (var i = 0, x = stars.length; i < x; i++) {
    stars[i].show();
    stars[i].update();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
