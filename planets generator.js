function preload() {
  // put preload code here
}

var newPlanet;
var planets = [];
var planetsPrev = [];
//contatore per triggerare funzione creapianeti
var clicckato = 0;
var distance;
var mappedDistance;
//planet size counter variables
var interval;
var mousePressedDuration = 0;
var pressSize = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);

}

function mousePressed() {
  interval = setInterval(timeIt, 50);
  for (var i = 0; i < 1; i++) {
    newPlanetPrev = new PlanetPrev(mouseX, mouseY, pressSize);
    //planetsPrev.push(newPlanetPrev);
  }
}
//size related with the mouse pressed duration
function timeIt() {
  mousePressedDuration++;
  if (mousePressedDuration == 28) {
    clearInterval(interval);
  }
  pressSize = map(mousePressedDuration, 0, 28, 5, 70);
  // console.log(pressSize);
  newPlanetPrev.size = pressSize;
}

function keyPressed(e) {
  for (var i = 0; i < planets.length; i++) {
    planets[i].setIncremento(0.1);
    console.log(planets[i].incremento);
  }
}

function mouseReleased() {
  var canvasDimension = 300;
    //distances that will be used to set the velocity of the planet
    distance = dist(mouseX, mouseY, width / 2, height / 2);
    //dobbiamo definire dimensioni box dello sketch
    mappedDistance = map(distance, 0, canvasDimension, 0.01, 0.08);
    //imposteremo questo if di modo che non permetta il trigger della funzione
    // if (distance > 500) {
    //   mappedDistance = 0.09
    var reald = 0.1 - mappedDistance;
    console.log(reald);
    //adding a new planet
    newPlanet = new Planet(mouseX, mouseY, pressSize, reald);
    //dipenderà dalle dimensioni del canvas, il limite oltre il quake non crea più pallini
    if(distance < canvasDimension){
    planets.push(newPlanet);
  //aggiungo valore ad un counter che mi azionerà display
  clicckato++;
  }
  //riporto a zero durata mouse pressed
  clearInterval(interval);
  mousePressedDuration = 0;
  pressSize = 0;
}

function draw() {
  background(0);
  // console.log(mousePressedDuration);
  push();
  stroke(255);
  fill(0);
  ellipse(width/2, height/2, 40);
  pop();

  if (mouseIsPressed) {
    newPlanetPrev.display();
  }

  push();
  translate(width / 2, height / 2);
  if (clicckato != 0) {
    for (var j = 0; j < planets.length; j++) {
      planets[j].display();
    }
  }
  pop();
}

function PlanetPrev(_x, _y, _size) {
  this.x = _x;
  this.y = _y;
  this.size = _size;

  this.display = function() {
    push();
    fill(255, 100);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}

function Planet(_x, _y, _size, _velocity) {
  this.x = _x;
  this.y = _y;
  this.size = _size;
  this.velocity = _velocity;
  this.angle = 0;
  this.incremento = 0;
  this.addVelocity = 0;


  this.setIncremento = function(incremento) {
    this.incremento = incremento / 10;
  }

  this.display = function() {
    this.addVelocity = this.angle += this.incremento;
    this.angle += this.velocity ;
    push()
    rotate(this.angle);
    translate(this.x - width / 2, this.y - height / 2);
    ellipse(0, 0, this.size);
    pop()
  }

}
