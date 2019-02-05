var canvas;
var canvasDimension = 350;
var newPlanet;
var planets = [];
var planetsPrev = [];
//contatore per triggerare funzione creapianeti
var clicckato = 0;
var distance;
var mappedDistance;
//planet size counter variables
var interval;
var mousePressedDuration = 0;
var pressSize = 0;
//velocity increment animation
var intervalAnimation;
var completedAnimation = 0;
var holdingTime = 80;
var barLenght = 10;
// holding time 80, interval 30, inc 0,01
var uploaded = false;
var uploadFinish = 0;
var justOne = 0;
//Mojs variables
var burst = new mojs.Burst({
    left: 0,
    top: 0,
    radius: {
        30: 43
    },
    angle: {
        200: 360
    },
    count: 10,
    children: {
        radius: {
            6: 0
        },
        fill: 'white',
        shape: 'zigzag',
        duration: 2000,
        // x : 300,
    }
})
var circle_options = {
    left: 0,
    top: 0,
    radius: {
        10: 30
    },
    fill: 'none',
    stroke: 'white',
    opacity: {
        1: 0
    },
    duration: 500,
}
var circ = new mojs.Shape({
    ...circle_options
})
var circ2 = new mojs.Shape({
    ...circle_options,
    delay: 200
})
var timeline = new mojs.Timeline({
        repeat: 999,
    })
    .add(burst);
    var coords;
//Text VARIABLES
var spanVel; //velocity average
var span1;
var span2;
var span3;
//Camera input
var capture;
var w = 10;
var h = 10;
//Materia oscura
var scl = 20;
var cols, rows;
var flowfield;
var r, g, b;
var zoff = 0;

module = noise;
//altre variabili--
var avg;
var xbr;
var ybr;

var isCompletedAnimation = false;
var isCompletedAnimationDarkMatter = false;

function windowResized() {
    resizeCanvas((windowWidth / 4 * 3), windowHeight);
     xbr = width / 2;
   ybr = height / 2;
    burst.tune({x : xbr});
    burst.tune({y : ybr});
}

function setup() {

    //CAMERA CAPTURE
    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, function () {
        console.log('capture ready.')
    });

//    frameRate(15);
    capture.elt.setAttribute('playsinline', '');
    capture.size(w, h);
    //createCanvas(windowWidth, windowHeight);
    canvas = createCanvas((windowWidth / 4 * 3), windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    capture.hide();

    //by planets_generator.js
    // coords = {
    //     x: width / 2,
    //     y: height / 2
    // };
    // burst.tune(coords);
    xbr = (window.innerWidth/4 * 3) / 2;
    ybr = window.innerHeight / 2;
    burst.tune({x : xbr});
    burst.tune({y : ybr});
}



function draw() {

    //console.log(frameCount);
    //CAMERA CAPTURE
    // image(capture, 0, 0, w, h);
    capture.loadPixels();;
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
        //console.log(avg)
        select('#average-color').elt.style.backgroundColor = 'rgb(' + avg + ',' + avg + ',' + avg + ')';
    }


    if (avg < 50) {
        materia_oscura_draw();
    } else {
        background(0);
    }
    //SUN
    // coords = {
    //     x: width / 2,
    //     y: height / 2
    // };

    burst.play();
    push();
    stroke(255);
    strokeWeight(2);
    fill(0);
    ellipse(width / 2, height / 2, 40);
    pop();


    //display PREVIEW
    if (mouseIsPressed) {
        newPlanetPrev.display();
    }
    //PLANETS VELOCITY AVERAGE and MASS
    var somma = 0;
    var average = 0;
    var mappedAverage;
    var mass =[];
    var masMass= 0;
    for (var i = 0; i < planets.length; i++) {
        somma = somma += planets[i].velocity;
        //console.log(i + 'corrisponde' + planets[i].velocity);
        mass.push(planets[i].size);
        masMass += Math.trunc(mass[i]);
    }
    average = somma / planets.length;
    var biggerAverage = average * 1000;
    mappedAverage = Math.trunc(map(biggerAverage, 0, 17, 0, 50));
    //console.log('average'+biggerAverage);
    //console.log('mapped'+mappedAverage);
    //type velocity average
    spanVel = select('.spanVel');
    spanMass= select('.spanMass');
    spanVel.html("Average velocity: " + mappedAverage + " km/s");
    spanMass.html("Total mass: " +masMass + " kg x 10^12");
    //SYSTEM UPLOAD
    //display Bar
    if (completedAnimation > 0) {
        newBar.display();
    }


    if (completedAnimation > 80) {
        newBar.noBar();
        // span2.html('Nuovo testo blablabla');
        spanVel.html("Average velocity:ERROR");
        spanVel.style('color', 'RED');

  //       fill('RED');
  // fill(255 + sin(frameCount * 0.1) * 128); //velocità e intensità blinking
  // textSize(40);
  // // fill("red");
  // text("ERROR", 10, 50);

        materia_oscura_setup();


        $(".span1").remove();
        $(".span2").remove();
        $(".span3").remove();
        $(".span4").remove();
        $(".span5").remove();


        if (!isCompletedAnimation) {
            iterator = 6;
            console.log("sto qua");
            $(".span6").shuffleLetters({
                callback: nextSpan2
            });
            isCompletedAnimation = true;
        }
    }
    //display PLANETS
    push();
    translate(width / 2, height / 2);
    if (clicckato != 0) {
        for (var j = 0; j < planets.length; j++) {
            planets[j].display();
            //console.log(planets)
        };

        pop();
    }
    //TEXT FLOW
    if (avg < 50 && !isCompletedAnimationDarkMatter && iterator >= 8) {
        iterator = 9;

        $(".span6").remove();
        $(".span7").remove();
        $(".span8").remove();

        $(".span9").shuffleLetters({
                callback: nextSpan3
            });
        isCompletedAnimationDarkMatter = true;

    }
    //  console.log(textEnd);

}
