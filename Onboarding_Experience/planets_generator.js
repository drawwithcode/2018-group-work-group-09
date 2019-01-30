var sketch1 = function( p ) {

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
var holdingTime = 80;
// holding time 80, interval 30, inc 0,01
var uploaded = false;
var uploadFinish = 0;
var pd = 0;
//Mojs variables
var burst = new mojs.Burst({
  left: 0, top: 0,
  radius : { 30 : 43},
  angle : {200: 360},
  count:10,
  children : {
    radius : {6 : 0},
    fill: 'white',
    shape: 'zigzag',
    duration: 2000,
    // x : 300,
  }
})
var circle_options ={
  left: 0, top: 0,
  radius : {10 : 30},
  fill : 'none',
  stroke : 'white',
  opacity : {1 : 0},
  duration : 500,
}
var circ = new mojs.Shape({
  ...circle_options
})
var circ2 = new mojs.Shape({
  ...circle_options,
  delay : 200
})
var timeline = new mojs.Timeline({
  repeat:999,
})
// .add(burst, circ, circ2)


//console.log(uploaded);


p.setup = function() {
  var canvas = p.createCanvas((p.windowWidth / 4 * 3), p.windowHeight);
  canvas.parent("sketch1");
  //ANIMATION MOJS sun

}
//PLANET SIZE PREVIEW
p.mousePressed = function() {
  interval = setInterval(timeIt, 50);
  newPlanetPrev = new PlanetPrev(p.mouseX, p.mouseY, pressSize);
  //planetsPrev.push(newPlanetPrev);
}
//size related with the mouse pressed duration
function timeIt() {
  mousePressedDuration++;
  distance = p.dist(p.mouseX, p.mouseY, p.width / 2, p.height / 2);
  if (mousePressedDuration == 28) {
    clearInterval(interval);
  }
  pressSize = p.map(mousePressedDuration, 0, 28, 5, 70);
  // console.log(pressSize);
  if (distance <= canvasDimension && uploaded === false) {
    newPlanetPrev.size = pressSize;
  }
}
//VELOCITY INCREMENT and UPLOAD BAR
p.keyPressed = function(e) {
  pd++;
  //uploadTried++;
  //ci mette quasi 3 secondi (30 ms * 80 volte)
  intervalAnimation = setInterval(uploadGalaxy, 30);
  if (pd === 1) {
    newBar = new UploadBar();
  }
}
function uploadGalaxy() {
  if (p.keyIsPressed == true && completedAnimation <= holdingTime) {
    completedAnimation++;
    for (var i = 0; i < planets.length; i++) {
      planets[i].setIncremento(0.01)
      console.log(planets[i].incremento);
      console.log(planets[i].velocity);
    }
  }
  console.log(completedAnimation);
  if (completedAnimation >= holdingTime + 1) {
    uploadFinish++;
    clearInterval(intervalAnimation);
    //chiamo funzione per cancellare tutto
    newBar.noBar();
  }
  if (completedAnimation <= holdingTime) {
    newBar.sizeWidth = completedAnimation * 5;
  }
  if (p.keyIsPressed == false && completedAnimation > 0 && uploadFinish <= 1) {
    completedAnimation--;
    for (var k = 0; k < planets.length; k++) {
      planets[k].setIncremento(-0.01)
      console.log(planets[k].incremento);
      console.log(planets[k].velocity);
    }
  }
  //uploading bar
  uploaded = true;
}
//CREAZIONE PLANETS
p.mouseReleased = function () {
  //distances that will be used to set the velocity of the planet
  distance = p.dist(p.mouseX, p.mouseY, p.width / 2, p.height / 2);
  mappedDistance = p.map(distance, 0, canvasDimension, 0.01, 0.08);
  var reald = 0.1 - mappedDistance;
  console.log(distance);
  console.log(reald);
  //adding a new planet
  //stop producing planets after the upload
  if (uploaded === false && distance < canvasDimension) {
    //animation
    //burst.play();
    circ.play();
    var coords = { x: p.mouseX, y: p.mouseY };
    var endSize = p.map(pressSize, 0, 28, 3, 45);
    //var endAnimation = p.map(pressSize, 0, 28, 800,2000);
    var animationSize = {radius: { 0 : endSize}};
    //var animationTime = {duration: endAnimation};
    //burst.tune(coords);
    circ.tune(coords);
    circ.tune(animationSize);
    //circ.tune(animationTime);
    newPlanet = new Planet(p.mouseX, p.mouseY, pressSize, reald);
    planets.push(newPlanet);
    //aggiungo valore ad un counter che mi azionerà display
    clicckato++;
  }
  //riporto a zero durata mouse pressed
  clearInterval(interval);
  mousePressedDuration = 0;
  pressSize = 0;
}

p.draw = function() {
  p.background(0);
  //SUN
  var coords = { x: (p.width / 2), y: (p.height / 2) };
  burst.tune(coords);
  burst.play();
  p.push();
  p.stroke(255);
  p.strokeWeight(2);
  p.fill(0);
  p.ellipse(p.width / 2, p.height / 2, 40);
  p.pop();
  //display PREVIEW
  if (p.mouseIsPressed) {
    newPlanetPrev.display();
  }
  //display PLANETS
  p.push();
  p.translate(p.width / 2, p.height / 2);
  if (clicckato != 0) {
    for (var j = 0; j < planets.length; j++) {
      planets[j].display();
    }
  }
  p.pop();
  //PLANETS VELOCITY AVERAGE
  var somma = 0;
  var average;
  for (var i = 0; i < planets.length; i++) {
    somma = somma += planets[i].velocity;
    //console.log(i + 'corrisponde' + planets[i].velocity);
  }
  //console.log(somma);
  average = somma / planets.length;
  //console.log(average);
  //display Bar
  if (completedAnimation > 0) {
    newBar.display();
  }
  if (completedAnimation > 80) {
    newBar.noBar();
  }
}
// //FUNCTION PREVIEW
function PlanetPrev(_x, _y, _size) {
  this.x = _x;
  this.y = _y;
  this.size = _size;

  this.display = function() {
    p.push();
    p.fill(255, 100);
    p.ellipse(p.mouseX, p.mouseY, this.size);
    p.pop();
  }
 }
//FUNCTION UPLOAD BAR
function UploadBar() {
  this.sizeWidth = 400;
  this.sizeWidthTwo = 400;
  this.sizeHeight = 50 ;
  this.x = p.width / 2 - this.sizeWidthTwo/2;
  this.y = p.height / 2 + canvasDimension + 20;
  this.opacity= 0;
  this.display = function(_width) {
    //static rect
    p.push();
    p.stroke(255);
    p.strokeWeight(2);
    p.noFill();
    p.rect(this.x, this.y, this.sizeWidthTwo, this.sizeHeight);
    p.pop();
    //growing rect
    p.push();
    p.noStroke();
    p.fill(255,0,0,255);
    p.rect(this.x, this.y, this.sizeWidth, this.sizeHeight);
    p.pop();
    this.noBar = function() {
      p.noStroke();
 this.sizeWidth = 0;
 this.sizeWidthTwo = 0;
 this.sizeHeight = 0;
 p.push();
 p.fill(255);
 p.textAlign(p.CENTER);
 p.textSize(30);
 p.text('System Uploaded', p.width/2 , p.height / 2 + canvasDimension + 53);
 p.pop();
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
    p.push()
    p.rotate(this.angle);
    p.translate(this.x - p.width / 2, this.y - p.height / 2);
    p.ellipse(0, 0, this.size);
    p.pop()
  }

}
}
var p5_red = new p5(sketch1);
