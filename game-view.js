export default class GameView {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.board = {
      posX: 100,
      posY: 100,
      width: this.width,
      height: this.height
    };
    this.radius = this.board.width / 20;
    this.circles = [];

    this.moveCount = 0;

    for (let row = 1; row <= 6; row++) {
      for (let col = 1; col <= 7; col++) {
        this.circles.push({
          pos: [
            Math.round(this.board.posX + col * this.board.width / 8),
            Math.round(this.board.posY + row * this.board.height / 7)
          ],
          color: "white"
        });
      }
    }
  }

  drawBoard() {
    this.ctx.clearRect(
      this.board.posX,
      this.board.posY,
      this.width,
      this.height
    );
    this.ctx.beginPath();
    this.ctx.fillStyle = "yellow";
    this.ctx.rect(...Object.values(this.board));
    this.ctx.fill();
    this.ctx.closePath();

    this.drawCircles();
  }

  drawCircles() {
    this.circles.forEach(circle => {
      this.ctx.beginPath();
      this.ctx.fillStyle = circle.color;
      this.ctx.arc(...circle.pos, this.radius, 0, 2 * Math.PI, false);
      this.ctx.fill();
      this.ctx.closePath();
    });
  }

  findClickedCircle(pos) {
    let clicked;
    this.circles.forEach(circle => {
      if (
        Math.sqrt(
          Math.pow(pos[0] - circle.pos[0], 2) +
            Math.pow(pos[1] - circle.pos[1], 2)
        ) < this.radius
      ) {
        clicked = circle;
      }
    });

    return clicked;
  }

  circleFillInEvent(event) {
    const pos = [event.clientX, event.clientY];
    const clicked = this.findClickedCircle(pos);

    if (clicked && clicked.color === "white") {
      clicked.color = this.moveCount % 2 === 0 ? "black" : "red";
      this.moveCount++;
    }
    this.drawCircles();

    console.log(clicked);
  }

  resetCircles() {
    this.circles.forEach(circle => (circle.color = "white"));
  }
}
