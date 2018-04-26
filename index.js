// import GameView from "./game-view.js";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  const W = window.innerWidth;
  const H = window.innerHeight;

  canvas.width = W / 1.5;
  canvas.height = W / 1.75;

  const board = {
    posx: 100,
    posy: 100,
    width: canvas.width / 2,
    height: canvas.height / 2
  };
  ctx.beginPath();
  ctx.fillStyle = "yellow";
  ctx.rect(...Object.values(board));
  ctx.fill();

  const radius = board.width / 20;
  const circles = [];

  for (let row = 1; row <= 6; row++) {
    for (let col = 1; col <= 7; col++) {
      circles.push({
        pos: [
          board.posx + col * board.width / 8,
          board.posy + row * board.height / 7
        ],
        color: "white"
      });
    }
  }

  function drawCircles() {
    circles.forEach(circle => {
      ctx.beginPath();
      ctx.fillStyle = circle.color;
      ctx.arc(...circle.pos, radius, 0, 2 * Math.PI, false);
      ctx.fill();
    });
  }

  drawCircles();

  document.addEventListener("click", event => {
    const pos = [event.clientX, event.clientY];
    const clicked = findClickedCircle(pos);

    if (clicked) {
      clicked.color = "black";
    }

    drawCircles();

    console.log(clicked);
  });

  function findClickedCircle(pos) {
    let clicked;
    circles.forEach(circle => {
      if (
        Math.sqrt(
          Math.pow(pos[0] - circle.pos[0], 2) +
            Math.pow(pos[1] - circle.pos[1], 2)
        ) < radius
      ) {
        clicked = circle;
      }
    });

    return clicked;
  }
});
