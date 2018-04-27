import GameView from "./game-view";
import Game from "./game";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  const W = window.innerWidth;
  const H = window.innerHeight;
  canvas.width = W / 3;
  canvas.height = W / 3.5;

  const resetButton = document.getElementById("reset");

  function initialRender() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const game = new Game("EASY");
    const gameView = new GameView(
      ctx,
      canvas.width - 100,
      canvas.height - 100,
      game
    );
    gameView.drawBoard();

    document.addEventListener("click", event =>
      gameView.circleFillInEvent(event)
    );
    resetButton.addEventListener("click", () => {
      // gameView.resetCircles();
      gameView.drawBoard();
      game.reset();
    });
  }

  initialRender();
});
