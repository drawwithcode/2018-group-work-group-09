function preload() {
  // put preload code here
}

var newPlanet;
var planets = [];
//contatore per triggerare funzione creapianeti
var clicckato = 0;
var distance;
var mappedDistance;


function setup() {
  createCanvas(windowWidth, windowHeight);

}

function mousePressed() {
  for (var i = 0; i < 1; i++) {
 //distances that will be used to set the velocity of the planet
    distance = dist(mouseX, mouseY, width/2, height/2);
//dobbiamo definire dimensioni box dello sketch
    mappedDistance = map(distance, 0, 500, 0.005,  0.1);
//imposteremo questo if di modo che non permetta il trigger della funzione
    if(distance > 500){mappedDistance = 0.09};
    console.log(distance);
    console.log(mappedDistance);
    var reald = 0.1 - mappedDistance;
    console.log(reald);
  //adding a new planet
    newPlanet = new Planet(mouseX, mouseY, 30, reald);
    planets.push(newPlanet);
  }
  //aggiungo valore ad un counter che mi azionerà display
  clicckato++;
}

function draw() {
  background(0);
  //centrare sketch
  translate(width / 2, height / 2);

  if (clicckato != 0) {
    for (var j = 0; j < planets.length; j++) {
      planets[j].display();
    }
  }
  //console.log(clicckato);
}

function Planet(_x, _y, _size, _velocity) {
  this.x = _x;
  this.y = _y;
  this.size = _size;
  this.velocity= _velocity;
  this.angle = 0;

  this.display = function() {
    this.angle += this.velocity;
    push()
    rotate(this.angle);
    translate(this.x - width / 2, this.y - height / 2);
    ellipse(0, 0, this.size);
    pop()
  }

}
