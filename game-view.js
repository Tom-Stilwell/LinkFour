export default class GameView {
  constructor(ctx, width, height, game) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.game = game;

    this.display = {
      posX: 100,
      posY: 100,
      width: this.width,
      height: this.height
    };
    this.radius = this.display.width / 20;
    this.circles = [];

    for (let row = 1; row <= 6; row++) {
      for (let col = 1; col <= 7; col++) {
        this.circles.push({
          pos: [
            Math.round(this.display.posX + col * this.display.width / 8),
            Math.round(this.display.posY + row * this.display.height / 7)
          ],
          color: "ivory",
          row: row - 1,
          col: col - 1
        });
      }
    }
  }

  drawBoard() {
    this.ctx.clearRect(
      this.display.posX,
      this.display.posY,
      this.width,
      this.height
    );
    this.ctx.beginPath();
    this.ctx.fillStyle = "yellow";
    this.ctx.rect(...Object.values(this.display));
    this.ctx.fill();
    this.ctx.closePath();

    this.drawCircles();
  }

  drawCircles() {
    let marker;
    this.circles.forEach(circle => {
      marker = this.game.board.cells[circle.row][circle.col];
      circle.color = marker ? marker : "ivory";
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

    if (clicked && clicked.color === "ivory") {
      this.game.makeMove([clicked.row, clicked.col]);
    }
    this.drawCircles();
  }

  resetCircles() {
    this.circles.forEach(circle => (circle.color = "ivory"));
  }
}
