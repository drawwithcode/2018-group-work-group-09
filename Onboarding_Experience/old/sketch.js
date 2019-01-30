// Global variables, declared outside of anything.
// They can be accessed and modified by any the P5js canvas
var position = {'x':0, 'y':0 }

// var sketch1 = function( p ) {
//   // The following are variables accessible ONLY from within this canvas.
//   var dragging = false;
//   var bg_col = p.color('black');
//   var bg_col_dragging = p.color('pink');
//
//   // Ordinary p5js functions preceded by 'p.'
//   p.setup = function() {
//     var canvas = p.createCanvas((p.windowWidth / 4 * 3), p.windowHeight);
//
//   // MODIFICA GIULIANO, CANVAS DENTRO DIV
//   canvas.parent("sketch1");
//
//
//     // place the canvas in the object with the id "green-canvas"
//     // canvas.parent('sketch');
//   };
//   p.draw = function() {
//     if (dragging == true) {
//       // Even variables such as 'mouseX' need to be written as 'p.mouseX'
//       position.x = p.mouseX;
//       position.y = p.mouseY;
//       p.background(bg_col_dragging);
//     } else {
//       p.background(bg_col);
//     }
//     p.ellipse(position.x, position.y, 50)
//     p.rect(50,50, 70, 85);
//   };
//   p.mousePressed = function() {
//     // The 'dist()' function becames 'p.dist()'
//     var dist = p.dist(position.x, position.y, p.mouseX, p.mouseY)
//     if ( dist <= 25 ) {
//       dragging = true;
//     }
//   }
//   p.mouseReleased = function() {
//     dragging = false;
//   }
//
//
//   p.windowResized = function (){
//     p.resizeCanvas(p.windowWidth / 4 * 3, p.windowHeight);
//   }
// };

// With the same locig, you can create as many canvas as you want
// var sketch2 = function( p ) {
//   // function draw() {
//   //   p.background(50);
//   //   p.fill(255);
//   //   p.textSize(10);
//   //   p.text(hd, 40, 80);
//   // }
// var hd = "Ops there's something wrong here!\nDark Matter(s)\nA project about something you still don’t know\nIf you can see it it means it exists If you can’t see it,\nit exists (Tutorial elemento centrale con ordini)\nYou are now floating in the universe.\nCreate your own galaxy and learn more about\nhow things move up here!\nTo start a new galaxy, simply PRESS YOUR MOUSE."
//   // The following are variables accessible ONLY from within this canvas.
//   // var dragging = false;
//   // var bg_col = p.color('green');
//   // var bg_col_dragging = p.color(100,255,100);
//   // Ordinary p5js functions preceded by 'p.'
//   p.setup = function() {
//     var canvas = p.createCanvas(p.windowWidth/3.6, p.windowHeight)
//       p.noLoop();
//     // place the canvas in the object with the id "green-canvas"
//     // canvas.parent('green-canvas');
//   };
//   p.draw = function() {
//     // p.background(50);
//     // p.fill(255);
//     // p.textSize(200);
//     // p.text(hd, 50, 80);
//
//     p.push();
//     p.background(50);
//     p.fill('WHITE');
//     p.textFont('Source Code Pro');
//     p.noStroke();
//     p.textSize(25);
//     p.text(hd, 20, 30);
//     p.pop();
//
//
//     // if (dragging == true) {
//     //   // Even variables such as 'mouseX' need to be written as 'p.mouseX'
//     //   position.x = p.mouseX;
//     //   position.y = p.mouseY;
//     //   p.background(bg_col_dragging);
//     // } else {
//     //   p.background(bg_col);
//     // }
//     // p.ellipse(position.x, position.y, 50)
// //   };
// //   p.mousePressed = function() {
// //     // The 'dist()' function becames 'p.dist()'
// //     var dist = p.dist(position.x, position.y, p.mouseX, p.mouseY)
// //     if ( dist <= 25 ) {
// //       dragging = true;
// //     }
// //   }
// //   p.mouseReleased = function() {
// //     dragging = false;
// //   }
// p.windowResized = function (){
//   p.resizeCanvas(p.windowWidth/3.6, p.windowHeight);
// }
// }};



// var p5_green = new p5(sketch2);



// ——————————————————————————————
// ANIMAZIONE H1
var iterator = 1;

(function($) {


  $.fn.shuffleLetters = function(prop) {

    var options = $.extend({
      "step": 4, // How many times should the letters be changed
      "fps": 15, // Frames Per Second
      "text": "", // Use this text instead of the contents
      "callback": function() {
        iterator++;
          $(".span" + iterator).shuffleLetters();
      }


       // Run once the animation is complete
    }, prop)

    return this.each(function() {

      var el = $(this),
        str = "";

        el.addClass("is-visible");

      // Preventing parallel animations using a flag;

      if (el.data('animated')) {
        return true;
      }

      el.data('animated', true);


      if (options.text) {
        str = options.text.split('');
      } else {
        str = el.text().split('');
      }

      // The types array holds the type for each character;
      // Letters holds the positions of non-space characters;

      var types = [],
        letters = [];

      // Looping through all the chars of the string

      for (var i = 0; i < str.length; i++) {

        var ch = str[i];

        if (ch == " ") {
          types[i] = "space";
          continue;
        } else if (/[a-z]/.test(ch)) {
          types[i] = "lowerLetter";
        } else if (/[A-Z]/.test(ch)) {
          types[i] = "upperLetter";
        } else {
          types[i] = "symbol";
        }

        letters.push(i);
      }

      el.html("");

      // Self executing named function expression:

      (function shuffle(start) {

        // This code is run options.fps times per second
        // and updates the contents of the page element

        var i,
          len = letters.length,
          strCopy = str.slice(0); // Fresh copy of the string

        if (start > len) {

          // The animation is complete. Updating the
          // flag and triggering the callback;

          el.data('animated', false);
          options.callback(el);
          return;
        }

        // All the work gets done here
        for (i = Math.max(start, 0); i < len; i++) {

          // The start argument and options.step limit
          // the characters we will be working on at once

          if (i < start + options.step) {
            // Generate a random character at thsi position
            strCopy[letters[i]] = randomChar(types[letters[i]]);
          } else {
            strCopy[letters[i]] = "";
          }
        }

        el.text(strCopy.join(""));

        setTimeout(function() {

          shuffle(start + 1);

        }, 1000 / options.fps);

      })(-options.step);


    });
  };

  function randomChar(type) {
    var pool = "";

    if (type == "lowerLetter") {
      pool = "abcdefghijklmnopqrstuvwxyz0123456789";
    } else if (type == "upperLetter") {
      pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    } else if (type == "symbol") {
      pool = ",.?/\\(^)![]{}*&^%$#'\"";
    }

    var arr = pool.split('');
    return arr[Math.floor(Math.random() * arr.length)];
  }

})
(jQuery);

$(".span1").shuffleLetters();
