
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
        noStroke();
  this.sizeWidth = 0;
  this.sizeWidthTwo = 0;
  this.sizeHeight = 0;
     }
   }
 }
