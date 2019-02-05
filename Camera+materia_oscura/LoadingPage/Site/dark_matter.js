function materia_oscura_setup() {
  cols = floor(width /scl  + scl);
  rows = floor(height/scl + scl);
}

function materia_oscura_draw() {
  background(0);
  for (var y = 0; y < rows; y+=2) {
    for (var x = 0; x < cols; x+=2) {
      var angle = module.simplex3(x / 50, y / 50, zoff) * PI * 2;
      var length = module.simplex3(x / 50 + 40000, y / 50 + 40000, zoff);
      push();
      stroke(255);

      translate(x * scl, y * scl) //così me ne fa uno ogni 20;
      rotate(angle);
      strokeWeight(2);
      line(scl * length, scl * length, scl * length, scl * length);
      pop();

      zoff += 0.000009;
    }
  }
}
