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
  if (distance <= canvasDimension && distance >= 50 && uploaded === false) {
    newPlanetPrev.size = pressSize;
  }
}
//VELOCITY INCREMENT and UPLOAD BAR
 function keyPressed(e) {
  justOne++;
  //uploadTried++;
  //ci mette quasi 3 secondi (30 ms * 80 volte)

  if (keyCode == 32) {
    console.log('fin qua ok');
    intervalAnimation = setInterval(uploadGalaxy, 30);
    newBar = new UploadBar();
  }
}
function uploadGalaxy() {
    if ( keyIsPressed == true && completedAnimation <= holdingTime && keyCode == 32 && iterator >=5) {
    completedAnimation++;
    barLenght++;
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
    newBar.sizeWidth = barLenght * 4.4;
  }
  if ( keyIsPressed == false && completedAnimation > 0 && uploadFinish <= 1) {
    completedAnimation--;
    barLenght--;
    for (var k = 0; k < planets.length; k++) {
      planets[k].setIncremento(-0.01)
      //console.log(planets[k].incremento);
      //console.log(planets[k].velocity);
      uploaded = true;
    }
  }
  //uploading bar

  console.log(uploaded);
}
//CREAZIONE PLANETS
 function mouseReleased () {
  //distances that will be used to set the velocity of the planet
  distance =  dist( mouseX,  mouseY,  width / 2,  height / 2);
  mappedDistance =  map(distance, 0, canvasDimension, 0.01, 0.08);
  var reald = 0.1 - mappedDistance;
  //console.log(distance);
  //console.log(reald);
  //adding a new planet
  //stop producing planets after the upload
  if (uploaded === false && distance < canvasDimension && distance >= 50 ) {
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
