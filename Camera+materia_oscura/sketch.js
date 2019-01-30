//Camera input
var capture;
var w = 640;
var h = 480;
//Materia oscura
var scl = 20;
var cols, rows;
var flowfield;
var r, g, b;
var zoff = 0;

module = noise;
//altre variabili--

function setup() {
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
  createCanvas(windowWidth, windowHeight);
  capture.hide();
  materia_oscura_setup()
}

function draw() {
  // image(capture, 0, 0, w, h);
  capture.loadPixels();
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
    select('#average-color').elt.style.backgroundColor = 'rgb(' + avg + ',' + avg + ',' + avg + ')';
  }
  console.log(avg)

  if (avg < 70) {
    materia_oscura_draw();
  } else {
    background(0);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
