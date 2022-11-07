/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
// setting correct scaling:
const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 700);
let canvasPosition = canvas.getBoundingClientRect();
//built-in JS method that returns object
//that provides information about the size of element
//relative to view-port
console.log(canvasPosition);
console.log(canvas);

const explosions = [];

class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth * 0.5;
    this.height = this.spriteHeight * 0.5;
    // multiplication is faster than division CPU wise
    this.image = new Image();
    this.image.src = "./pictures/boom.png";
    this.frame = 0;
    this.timer = 0;
  }
  update() {
    ++this.frame;
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

window.addEventListener("click", function (e) {
  let positionX = e.x - canvasPosition.left;
  let positionY = e.y - canvasPosition.top;

  explosions.push(new Explosion(positionX, positionY));
});

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  for (let i = 0; i < explosions.length; ++i) {
    explosions[i].update();
    explosions[i].draw();
  }
  requestAnimationFrame(animate);
}
animate();
