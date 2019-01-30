// var sketch1 = function( p ) {

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

var canvas;
function setup() {
  canvas = createCanvas((windowWidth / 4 * 3), windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
  //canvas.parent("sketch1");

}
//PLANET SIZE PREVIEW
 function mousePressed() {
  interval = setInterval(timeIt, 50);
  newPlanetPrev = new PlanetPrev( mouseX,  mouseY, pressSize);
  //planetsPrev.push(newPlanetPrev);
}
//size related with the mouse pressed duration
function timeIt() {
  mousePressedDuration++;
  distance =  dist( mouseX,  mouseY,  width / 2,  height / 2);
  if (mousePressedDuration == 28) {
    clearInterval(interval);
  }
  pressSize =  map(mousePressedDuration, 0, 28, 5, 70);
  // console.log(pressSize);
  if (distance <= canvasDimension && uploaded === false) {
    newPlanetPrev.size = pressSize;
  }
}
//VELOCITY INCREMENT and UPLOAD BAR
 function keyPressed(e) {
  pd++;
  //uploadTried++;
  //ci mette quasi 3 secondi (30 ms * 80 volte)
  intervalAnimation = setInterval(uploadGalaxy, 30);
  if (pd === 1) {
    newBar = new UploadBar();
  }
}
function uploadGalaxy() {
  if ( keyIsPressed == true && completedAnimation <= holdingTime) {
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
  if ( keyIsPressed == false && completedAnimation > 0 && uploadFinish <= 1) {
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
 function mouseReleased () {
  //distances that will be used to set the velocity of the planet
  distance =  dist( mouseX,  mouseY,  width / 2,  height / 2);
  mappedDistance =  map(distance, 0, canvasDimension, 0.01, 0.08);
  var reald = 0.1 - mappedDistance;
  console.log(distance);
  console.log(reald);
  //adding a new planet
  //stop producing planets after the upload
  if (uploaded === false && distance < canvasDimension) {
    //animation
    //burst.play();
    circ.play();
    var coords = { x:  mouseX, y:  mouseY };
    var endSize =  map(pressSize, 0, 28, 3, 45);
    //var endAnimation =  map(pressSize, 0, 28, 800,2000);
    var animationSize = {radius: { 0 : endSize}};
    //var animationTime = {duration: endAnimation};
    //burst.tune(coords);
    circ.tune(coords);
    circ.tune(animationSize);
    //circ.tune(animationTime);
    newPlanet = new Planet( mouseX,  mouseY, pressSize, reald);
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
  //SUN
  var coords = { x: ( width / 2), y: ( height / 2) };
  burst.tune(coords);
  burst.play();
   push();
   stroke(255);
   strokeWeight(2);
   fill(0);
   ellipse( width / 2,  height / 2, 40);
   pop();
  //display PREVIEW
  if ( mouseIsPressed) {
    newPlanetPrev.display();
  }
  //display PLANETS
   push();
   translate( width / 2,  height / 2);
  if (clicckato != 0) {
    for (var j = 0; j < planets.length; j++) {
      planets[j].display();
    }
  }
   pop();
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



// }
// var p5_red = new p5(sketch1);
