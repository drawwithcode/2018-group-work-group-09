var scl = 20;
var cols, rows;
var flowfield;
var r,g,b;

var zoff = 0;

module = noise;

function setup(){

  createCanvas(windowWidth, windowHeight);

  cols = floor(width/scl +scl);
  rows = floor(height/scl +scl);
  flowfield = new Array (cols*rows);
  for(var x = 0; x < cols; x++) {
    flowfield[x] = new Array(cols);
    for(var y = 0; y < rows; y++) {
      flowfield[x][y] = [0, 0];
    }
  }

}

function draw(){
  background(0);

  // var yoff = 0;
  for (var y = 0; y < rows; y++){
      // var xoff =0;
    for (var x = 0; x < cols; x++){
      var angle = module.simplex3(x/50, y/50, zoff) * PI * 2;
      var length = module.simplex3(x/50 + 40000, y/50 + 40000, zoff);
      flowfield[x][y][0] = angle;
      flowfield[x][y][1] = length;


      push();
      r = 255;
      g = 255;
      b = 255;
      // r = random(81,255);
      // g = 106;
      // b = 207;
      stroke(r,g,b);
      //stroke(lerpColor(color('#ea0043'), color('#0fefca'), frameCount/120));
      translate(x * scl, y * scl) //così me ne fa uno ogni 20;
      rotate(angle);
      strokeWeight(0.8);
      line ( 0,0,0, scl * length);
      pop();

      zoff +=0.000009;
  }
 }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
