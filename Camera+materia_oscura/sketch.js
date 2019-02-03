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
var barLenght = 10;
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
var spanVel;//velocity average
var span1;
var span2;
var span3;
//Camera input
var capture;
var w = 10;
var h = 10;
//Materia oscura
var scl = 20;
var cols, rows;
var flowfield;
var r, g, b;
var zoff = 0;

module = noise;
//altre variabili--
var avg;

function setup() {
  //CAMERA CAPTURE
  capture = createCapture({
    audio: false,
    video: {
      width: w,
      height: h
    }
  }, function() {
    console.log('capture ready.')
  });
  capture.elt.setAttribute('playsinline', '');
  capture.size(w, h);
  //createCanvas(windowWidth, windowHeight);
  canvas = createCanvas((windowWidth / 4 * 3), windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
  capture.hide();

//by planets_generator.js
  var coords = { x: width/2, y: height/2};
burst.tune(coords);
}

function draw() {
  //console.log(frameCount);
  //CAMERA CAPTURE
  // image(capture, 0, 0, w, h);
  capture.loadPixels();
  ;
  if (capture.pixels.length > 0) {
    var total = 0;
    var i = 0;
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var redValue = capture.pixels[i];
        total += redValue;
        i += 4;
      }
    }
    var n = w * h;
    var avg = int(total / n);
    //console.log(avg)
    select('#average-color').elt.style.backgroundColor = 'rgb(' + avg + ',' + avg + ',' + avg + ')';
  }

  if (avg < 70) {
    materia_oscura_draw();
  } else {
    background(0);
  }
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
    //console.log(i + 'corrisponde' + planets[i].velocity);
  }
  //console.log(somma);
  average = somma / planets.length;
  var biggerAverage= average*1000;
  mappedAverage = Math.trunc( map(biggerAverage, 0,17, 0, 50));
  //console.log('average'+biggerAverage);
  //console.log('mapped'+mappedAverage);
  //type velocity average
  spanVel = select('.spanVel');
  span2= select('.span2');
  span1= select('.span1');
  spanVel.html("Planets' velocity average:"+mappedAverage + "km/s");
  //SYSTEM UPLOAD
  //display Bar
  if (completedAnimation > 0) {
    newBar.display();
  }
  if (completedAnimation > 80) {
    newBar.noBar();
    // span2.html('Nuovo testo blablabla');
    spanVel.html("Planets' velocity average:ERROR");
    spanVel.style('color','RED');
    materia_oscura_setup();
    $(document).ready(function(){
    $(".span1").remove();
    $(".span3").remove();
    $(".span4").remove();
    $(".span5").remove();
  });
  if(textEnd==8){
    $(".span6").shuffleLetters();
}

  }
  //display PLANETS
   push();
   translate( width / 2,  height / 2);
  if (clicckato != 0) {
    for (var j = 0; j < planets.length; j++) {
      planets[j].display();
      //console.log(planets)
    };

   pop();
}
//TEXT FLOW
  if(textEnd==6){
  $(".span4").shuffleLetters();
  }
  if(textEnd==7){
  $(".span5").shuffleLetters();
  }
  if(textEnd==9){
  $(".span7").shuffleLetters();
  }
  if(textEnd==10){
  $(".span8").shuffleLetters();
  }
  if (avg < 70 && textEnd==11) {
  $(".spanDark").shuffleLetters();
  $(document).ready(function(){
  $(".span6").remove();
  $(".span7").remove();
  $(".span8").remove();
});
  }
  console.log(textEnd);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
