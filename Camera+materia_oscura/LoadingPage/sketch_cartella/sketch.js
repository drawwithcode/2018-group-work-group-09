
var y=0;
var radius=0;

function preload(){
  // put preload code here
}

function setup() {

  createCanvas(500,500);
  angleMode(DEGREES);
  background(25);
  noStroke();
//primo cerchietto di sfondo
  fill(50);
  ellipse(0,height/2,500);
// secondo cerchietto di sfondo
  ellipse(500,height/2,500);
}
function draw() {
//prima girella
push();
translate(0,height/2);
//pallocchio dietro
 y= 268,5;
  stroke(255);

  rotate(frameCount*2)
  line(0,0,height/2*cos(y),height/2*sin(y));
pop();

push();
  if(frameCount==100){
  noLoop();
  fill(255,0,0);
  ellipse(width/2,60,100);
  ellipse(width/2,440,100);
  ellipse(60,height/2,100);
    ellipse(440,height/2,100);
  fill(255);

  //domande esistenziali
      textSize(25);
      textAlign(CENTER);
    text('MA',width/2,70);
    text('IL',440,260);
    text('LOOP',width/2,450);
    text('DOV È?',60,260);

    stroke(255);
    strokeWeight(4);
}
//seconda girella
translate(500,height/2);
 y= 271.5;
  stroke(255);
  rotate(-frameCount*2)
  line(0,0,height/2*cos(y),height/2*sin(y));
pop();
}
