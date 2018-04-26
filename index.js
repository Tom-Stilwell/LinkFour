// import GameView from "./game-view.js";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  const W = window.innerWidth;
  const H = window.innerHeight;
  canvas.width = W / 3;
  canvas.height = W / 3.5;

  const resetButton = document.getElementById("reset");

  const board = {
    posx: 100,
    posy: 100,
    width: canvas.width - 100,
    height: canvas.height - 100
  };
  const radius = board.width / 20;
  const circles = [];
  let moveCount = 0;
  for (let row = 1; row <= 6; row++) {
    for (let col = 1; col <= 7; col++) {
      circles.push({
        pos: [
          Math.round(board.posx + col * board.width / 8),
          Math.round(board.posy + row * board.height / 7)
        ],
        color: "white"
      });
    }
  }

  function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.rect(...Object.values(board));
    ctx.fill();
    ctx.closePath();

    drawCircles();
  }

  function drawCircles() {
    circles.forEach(circle => {
      ctx.beginPath();
      ctx.fillStyle = circle.color;
      ctx.arc(...circle.pos, radius, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();
    });
  }

  function circleFillInEvent(event) {
    const pos = [event.clientX, event.clientY];
    const clicked = findClickedCircle(pos);

    if (clicked && clicked.color === "white") {
      clicked.color = moveCount % 2 === 0 ? "black" : "red";
      moveCount++;
    }
    drawCircles();

    console.log(clicked);
  }

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

  function initialRender() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    document.addEventListener("click", circleFillInEvent);
    resetButton.addEventListener("click", () => {
      circles.forEach(circle => (circle.color = "white"));
      drawBoard();
    });
  }

  initialRender();
});
