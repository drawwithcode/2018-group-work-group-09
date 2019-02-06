
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
