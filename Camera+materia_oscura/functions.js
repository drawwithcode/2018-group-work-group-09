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
 //FUNCTION UPLOAD BAR
 function UploadBar() {
   this.sizeWidth = 400;
   this.sizeWidthTwo = 400;
   this.sizeHeight = 50 ;
   this.x =  width / 2 - this.sizeWidthTwo/2;
   this.y =  height / 2 + canvasDimension + 20;
   this.opacity= 0;
   this.display = function(_width) {
     //static rect
      push();
      stroke(255);
      strokeWeight(3);
      noFill();
      rect(this.x, this.y, this.sizeWidthTwo, this.sizeHeight,50);
      pop();
     //growing rect
      push();
      noStroke();
      fill(255);
      rect(this.x , this.y , this.sizeWidth , this.sizeHeight,50);
      pop();
     this.noBar = function() {
        noStroke();
  this.sizeWidth = 0;
  this.sizeWidthTwo = 0;
  this.sizeHeight = 0;
   push();
   fill(255);
   textAlign( CENTER);
   textSize(30);
   text('System Uploaded',  width/2 ,  height / 2 + canvasDimension);
   pop();
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
      push()
      rotate(this.angle);
      translate(this.x -  width / 2, this.y -  height / 2);
      ellipse(0, 0, this.size);
      pop()
   }

 }
 function materia_oscura_setup() {
   console.log('siii collega');
  cols = floor(width / scl + scl);
  rows = floor(height / scl + scl);
  flowfield = new Array(cols * rows);
  for (var x = 0; x < cols; x++) {
    flowfield[x] = new Array(cols);
    for (var y = 0; y < rows; y++) {
      flowfield[x][y] = [0, 0];
    }
  }
}

function materia_oscura_draw() {
  background(0);
  console.log('si collega');
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var angle = module.simplex3(x / 50, y / 50, zoff) * PI * 2;
      var length = module.simplex3(x / 50 + 40000, y / 50 + 40000, zoff);
      flowfield[x][y][0] = angle;
      flowfield[x][y][1] = length;
      push();
      r = 255;
      g = 255;
      b = 255;
      // r = random(81,255);
      // g = 106;
      // b = 207;
      stroke(r, g, b);
      //stroke(lerpColor(color('#ea0043'), color('#0fefca'), frameCount/120));
      translate(x * scl, y * scl) //così me ne fa uno ogni 20;
      rotate(angle);
      strokeWeight(0.8);
      line(scl * length, scl * length, scl * length, scl * length);
      pop();

      zoff += 0.000009;
    }
  }
}
