function preload() {
  // put preload code here
}
var canvasDimension = 350;
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
//velocity increment animation
var intervalAnimation;
var completedAnimation = 0;
var uploaded = false;
var pd = 0;

//console.log(uploaded);


function setup() {
  createCanvas(windowWidth, windowHeight);
}
//PLANET SIZE PREVIEW
function mousePressed() {
  interval = setInterval(timeIt, 50);
  newPlanetPrev = new PlanetPrev(mouseX, mouseY, pressSize);
  //planetsPrev.push(newPlanetPrev);
}
//size related with the mouse pressed duration
function timeIt() {
  mousePressedDuration++;
  distance = dist(mouseX, mouseY, width / 2, height / 2);
  if (mousePressedDuration == 28) {
    clearInterval(interval);
  }
  pressSize = map(mousePressedDuration, 0, 28, 5, 70);
  // console.log(pressSize);
  if (distance <= canvasDimension && uploaded === false) {
    newPlanetPrev.size = pressSize;
  }
}
//VELOCITY INCREMENT and UPLOAD BAR
function keyPressed(e) {
  pd++;
  //ci mette quasi 3 secondi (30 ms * 80 volte)
  intervalAnimation = setInterval(uploadGalaxy, 30);
  if (pd === 1) {
    newBar = new UploadBar();
  }
}
function uploadGalaxy() {
  completedAnimation++;
  if (completedAnimation == 81) {
    clearInterval(intervalAnimation);
    //chiamo funzione per cancellare tutto
  }
  if (completedAnimation <= 80) {
    for (var i = 0; i < planets.length; i++) {
      planets[i].setIncremento(0.01)
      console.log(planets[i].incremento);
    }
    newBar.sizeWidth = completedAnimation * 5;
  }
  uploaded = true;
}
//CREAZIONE PLANETS
function mouseReleased() {
  //distances that will be used to set the velocity of the planet
  distance = dist(mouseX, mouseY, width / 2, height / 2);
  mappedDistance = map(distance, 0, canvasDimension, 0.01, 0.08);
  var reald = 0.1 - mappedDistance;
  console.log(distance);
  console.log(reald);
  //adding a new planet
  //stop producing planets after the upload
  if (uploaded === false) {
    newPlanet = new Planet(mouseX, mouseY, pressSize, reald);
    //dipenderà dalle dimensioni del canvas, il limite oltre il quake non crea più pallini
    if (distance < canvasDimension) {
      planets.push(newPlanet);
    }
    //aggiungo valore ad un counter che mi azionerà display
    clicckato++;
  }
  //riporto a zero durata mouse pressed
  clearInterval(interval);
  mousePressedDuration = 0;
  pressSize = 0;
}
function draw() {
  //console.log(uploaded);

  background(0);
  //SUN
  push();
  stroke(255);
  fill(0);
  ellipse(width / 2, height / 2, 40);
  pop();
  //display PREVIEW
  if (mouseIsPressed) {
    newPlanetPrev.display();
  }
  //display PLANETS
  push();
  translate(width / 2, height / 2);
  if (clicckato != 0) {
    for (var j = 0; j < planets.length; j++) {
      planets[j].display();
    }
  }
  pop();
  //PLANETS VELOCITY AVERAGE
  var somma = 0;
  var average;
  for(var i = 0; i < planets.length; i ++) {
    somma = somma += planets[i].velocity;
    console.log(i + 'corrisponde' + planets[i].velocity);
  }
  console.log(somma);
  average = somma / planets.length;
  console.log(average);
  //display Bar
  if (completedAnimation > 0) {
    newBar.display();
  }
}
//FUNCTION PREVIEW
function PlanetPrev(_x, _y, _size) {
  this.x = _x;
  this.y = _y;
  this.size = _size;

  this.display = function() {
    push();
    fill(255, 100);
    ellipse(mouseX, mouseY, this.size);
    pop();
  }
}
//FUNCTION UPLOAD BAR
function UploadBar() {
  this.sizeWidth = 40;
  this.display = function(_width) {
    push();
    stroke(255);
    strokeWeight(2);
    rect(width / 2 - 200, height / 2 + canvasDimension + 70, 400, 50);
    pop();
    push();
    stroke(255);
    strokeWeight(2);
    fill(0);
    rect(width / 2 - 200, height / 2 + canvasDimension + 70, this.sizeWidth, 50);
    pop();
    this.noBar = function() {
    }
  }
}
//FUNCTION PLANET GENERATOR
function Planet(_x, _y, _size, _velocity) {
  this.x = _x;
  this.y = _y;
  this.size = _size;
  this.velocity = _velocity / 5;
  this.angle = 0;
  this.incremento = 0;

  this.setIncremento = function(incremento) {
    this.incremento = incremento / 10;
    this.velocity += this.incremento;
  }
  this.display = function() {
    this.angle += this.velocity;
    push()
    rotate(this.angle);
    translate(this.x - width / 2, this.y - height / 2);
    ellipse(0, 0, this.size);
    pop()
  }

}
