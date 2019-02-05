
//PLANET SIZE PREVIEW
function mousePressed() {
  interval = setInterval(timeIt, 50);
  newPlanetPrev = new PlanetPrev(mouseX, mouseY, pressSize);
}
//size related with the mouse pressed duration
function timeIt() {
  mousePressedDuration++;
  distance = dist(mouseX, mouseY, width / 2, height / 2);
  if (mousePressedDuration == 28) {
    clearInterval(interval);
  }
  pressSize = map(mousePressedDuration, 0, 28, 5, 70);
  if (distance <= canvasDimension && distance >= 50 && uploaded === false) {
    newPlanetPrev.size = pressSize;
  }
}


// //FUNCTION PREVIEW
function PlanetPrev(_x, _y, _size) {
  this.x = _x;
  this.y = _y;
  this.size = _size;

  this.display = function() {
     push();
     fill(255, 100);
     ellipse( mouseX,  mouseY, this.size);
     pop();
  }
 }

 //CREAZIONE PLANETS
 function mouseReleased() {
   //distances that will be used to set the velocity of the planet
   distance = dist(mouseX, mouseY, width / 2, height / 2);
   mappedDistance = map(distance, 0, canvasDimension, 0.01, 0.08);
   var reald = 0.1 - mappedDistance;
   //console.log(distance);
   //console.log(reald);
   //adding a new planet
   //stop producing planets after the upload
   if (uploaded === false && distance < canvasDimension && distance >= 50) {
     //animation
     //burst.play();
     circ.play();
     var coords = {
       x: mouseX,
       y: mouseY
     };
     var endSize = map(pressSize, 0, 28, 3, 45);
     //var endAnimation =  map(pressSize, 0, 28, 800,2000);
     var animationSize = {
       radius: {
         0: endSize
       }
     };
     //var animationTime = {duration: endAnimation};
     //burst.tune(coords);
     circ.tune(coords);
     circ.tune(animationSize);
     //circ.tune(animationTime);
     newPlanet = new Planet(mouseX, mouseY, pressSize, reald);
     planets.push(newPlanet);
     //aggiungo valore ad un counter che mi azionerà display
     clicckato++;
   }
   //riporto a zero durata mouse pressed
   clearInterval(interval);
   mousePressedDuration = 0;
   pressSize = 0;
 }


 //FUNCTION PLANET GENERATOR
 function Planet(_x, _y, _size, _velocity) {
   this.x = _x;
   this.y = _y;
   this.size = _size;
   this.velocity = _velocity / 5;
   this.angle = 0;
   this.incremento = 0;
 //first planet paragraph
   if (clicckato != 0 && clicckato <=1) {
     $(document).ready(function(){
   });
   }
   this.setIncremento = function(incremento) {
     this.incremento = incremento / 10;
     this.velocity += this.incremento;
   }
   this.display = function() {
     this.angle += this.velocity;
      push()
      rotate(this.angle);
      translate(this.x -  width / 2, this.y -  height / 2);
      ellipse(0, 0, this.size);
      pop()
   }

 }
