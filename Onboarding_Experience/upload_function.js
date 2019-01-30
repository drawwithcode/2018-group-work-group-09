
  //FUNCTION PREVIEW
  function PlanetPrev(_x, _y, _size) {
    this.x = _x;
    this.y = _y;
    this.size = _size;

    this.display = function() {
      push();
      fill(255, 100);
      ellipse(p.mouseX, p.mouseY, this.size);
      pop();
    }
  }
