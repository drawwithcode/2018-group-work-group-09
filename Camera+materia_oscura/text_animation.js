var iterator = 1;
var options
var textEnd = 1;

(function($) {


  $.fn.shuffleLetters = function(prop) {

    var options = $.extend({
      "step": 4, // How many times should the letters be changed
      "fps": 15, // Frames Per Second
      "text": "", // Use this text instead of the contents
      "callback": function() {
        //era iterator ++
//          $(".span" + iterator).shuffleLetters();
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
          //ho modificato questo.

          options.callback(el);


          el.data('animated', false);
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

$(".span1").shuffleLetters({
   "callback": nextSpan
});

function nextSpan(){   
        iterator++;    
//        textEnd++;

    
    if (iterator < 6){
    
     var $parentDiv = $('#sketch2'),
        $innerListItem =  $(".span" + iterator);
        
        console.log("finito", iterator);
        $innerListItem.shuffleLetters({
            "callback": nextSpan
        });  
        
    }
    
      setInterval(function(){
          if (iterator < 6){
                $parentDiv.scrollTop($parentDiv.scrollTop() + $innerListItem.position().top + $innerListItem.outerHeight());
          }
        }, 1000);
    

    
}


function nextSpan2(){ 
    
    console.log("iteratore", iterator);
        iterator++;  
    
//        textEnd++;
   var $parentDiv = $('#sketch2'),
        $innerListItem =  $(".span" + iterator);
        
    
    if (iterator > 5 && iterator < 9){
    
  
        console.log("finito", iterator);
        $innerListItem.shuffleLetters({
            "callback": nextSpan2
        });  
        
    }
    
      setInterval(function(){
          if (iterator > 5 && iterator < 9){
                $parentDiv.scrollTop($parentDiv.scrollTop() + $innerListItem.position().top + $innerListItem.outerHeight());
          }
        }, 1000);
    

    
}

function nextSpan3(){ 
    
    console.log("iteratore", iterator);
        iterator++;  
    
//        textEnd++;
   var $parentDiv = $('#sketch2'),
        $innerListItem =  $(".span" + iterator);
        
    
    if (iterator > 8 && iterator < 12){
    
  
        console.log("finito", iterator);
        $innerListItem.shuffleLetters({
            "callback": nextSpan3
        });  
        
    }
    
      setInterval(function(){
          if (iterator > 8 && iterator < 12){
                $parentDiv.scrollTop($parentDiv.scrollTop() + $innerListItem.position().top + $innerListItem.outerHeight());
          }
        }, 1000);
    

    
}
    
    
$(".spanVel").shuffleLetters();
$(".spanMass").shuffleLetters();
