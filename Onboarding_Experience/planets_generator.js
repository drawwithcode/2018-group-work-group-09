
//GLOBAL VARIABLES
var canvas;
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
 .add(burst);
//Text VARIABLES
var span4;//velocity average
var span1;
var span2;
var span3;







//SKETCH
function setup() {
  canvas = createCanvas((windowWidth / 4 * 3), windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
var coords = { x: width/2, y: height/2};
burst.tune(coords);
}
 function draw() {
   background(0);
  //SUN
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
  //PLANETS VELOCITY AVERAGE
  var somma = 0;
  var average= 0;
  var mappedAverage;
  for (var i = 0; i < planets.length; i++) {
    somma = somma += planets[i].velocity;
    console.log(i + 'corrisponde' + planets[i].velocity);
  }
  //console.log(somma);
  average = somma / planets.length;
  mappedAverage = map(average, 0.01,0.1, 0, 100);
  //type velocity average
  span4 = select('.span4');
  span2= select('.span2');
  console.log(span4);
  span4.html("Planets' velocity average:"+mappedAverage + "km/h");
  //SYSTEM UPLOAD
  //display Bar
  if (completedAnimation > 0) {
    newBar.display();
  }
  if (completedAnimation > 80) {
    newBar.noBar();
    span2.html('Nuovo testo blablabla');
    span4.style('color','RED');
  }
  //display PLANETS
   push();
   translate( width / 2,  height / 2);
  if (clicckato != 0) {
    for (var j = 0; j < planets.length; j++) {
      planets[j].display();
      //console.log(planets)

    }
  }
   pop();

}
