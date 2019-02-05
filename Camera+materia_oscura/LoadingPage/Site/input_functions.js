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



//SPEED INCREMENT and UPLOAD BAR
function keyPressed(e) {
  justOne++;
  //ci mette quasi 3 secondi (30 ms * 80 volte)
  if (keyCode == 32) {
    console.log('fin qua ok');
    intervalAnimation = setInterval(uploadGalaxy, 30);
    newBar = new UploadBar();
  }
}



var decrease = false;
var increase = false;

function uploadGalaxy() {
//bar starts growing and speeds increment
  if (decrease == false && keyIsPressed == true && completedAnimation <= holdingTime && keyCode == 32 && iterator >= 5) {
    increase == true;
    completedAnimation++;
    barLenght++;
    for (var i = 0; i < planets.length; i++) {
      planets[i].setIncremento(0.01)
    }
  }

  //bar is completed
  if (completedAnimation >= holdingTime + 1) {
    clearInterval(intervalAnimation);
    //method to hide loading bar
    newBar.noBar();
    uploaded = true;
  }

  //growing bar
  if (completedAnimation <= holdingTime) {
    newBar.sizeWidth = barLenght * 4.4;
  }

  //bar is grown but not enough
  if (keyIsPressed == false && completedAnimation > 0 && uploaded == false) {
    completedAnimation--;
    barLenght--;
    decrease = true;
    increase = true;
    for (var k = 0; k < planets.length; k++) {
      planets[k].setIncremento(-0.01)

    }
  }
  //Avoid the sum of the intervals
  if (keyIsPressed == false && completedAnimation == 0) {
    clearInterval(intervalAnimation);
  }
  if (keyIsPressed == true && increase == true && decrease == true) {
    console.log('letto' + decrease);
    clearInterval(intervalAnimation);
    decrease = false;
    increase = false;
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
