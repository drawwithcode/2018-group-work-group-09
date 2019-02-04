function materia_oscura_setup() {
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
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var angle = noise(x / 50, y / 50, zoff) * PI * 2;
      var length = noise(x / 50 + 40000, y / 50 + 40000, zoff);
      flowfield[x][y][0] = angle;
      flowfield[x][y][1] = length;
      push();
      stroke(255);
      translate(x * scl, y * scl) //così me ne fa uno ogni 20;
      rotate(angle);
      strokeWeight(0.8);
      line(scl * length, scl * length, scl * length, scl * length);
      pop();
      zoff += 0.000009;
    }
  }
}
