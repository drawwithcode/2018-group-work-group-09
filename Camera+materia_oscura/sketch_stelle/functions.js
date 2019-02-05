function Star(){

  this.x = 0;
  this.y = 0;
  this.r = random()*4;
  this.offset = random() * 360;
  //il max serve a spargelo per altezza e lunghezza
  this.orbit = (random()+0.06) * max(width , height);


  this.update = function(){
    var originX = width/2;
    var originY = height/2;
    //il frameCount serve a farlo muovere;	TAU is a mathematical constant with the value 6.2831855. It is the circle constant relating the circumference of a circle to its linear dimension, the ratio of the circumference of a circle to its radius. It is useful in combination with trigonometric functions such as sin() and cos().
    var rad = (frameCount * (1/(this.orbit + this.offset)) + this.offset) % TAU;
    this.x = (originX + cos (rad)*(this.orbit));
    this.y = (originY + sin (rad)*(this.orbit));
    }

  this.show = function(){
    fill(255);
    ellipse(this.x, this.y, this.r);
  }
}
