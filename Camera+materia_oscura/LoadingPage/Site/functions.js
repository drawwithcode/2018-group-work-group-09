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
   this.sizeHeight = 20;
   this.x =  width / 2 - this.sizeWidthTwo/2;
   this.y =  windowHeight/6 * 5 ;
   this.opacity= 0;
   var rect1;
   var rect2;
   this.display = function(_width) {
     //static rect
      push();
      stroke(255);
      strokeWeight(1);
      noFill();
      rect1= rect(this.x, this.y, this.sizeWidthTwo, this.sizeHeight,50);
      pop();
     //growing rect
      push();
      noStroke();
      fill(255);
      rect2= rect(this.x , this.y , this.sizeWidth , this.sizeHeight,50);
      pop();
     this.noBar = function() {
      stroke(0);
  this.sizeWidth = 0;
  this.sizeWidthTwo = 0;
  this.sizeHeight = 0;
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
 //first planet paragraph
   if (clicckato != 0 && clicckato <=1) {
     $(document).ready(function(){
//     $(".span2").remove();
   });
//     $(".span3").shuffleLetters();
//     console.log(textEnd);

   }
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

 //function blinking

//  function blink(selector){
// $(selector).fadeOut('slow', function(){
//     $(this).fadeIn('slow', function(){
//         blink(this);
//     });
// });
// }
//
// blink('.blink');
