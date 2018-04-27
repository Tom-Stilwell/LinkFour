import Board from "./board";

import Computer from "./computer";

export default class Game {
  constructor(difficulty) {
    this.currentPlayer = "black";
    this.winner = undefined;
    this.board = new Board();
    this.computer = new Computer(difficulty);

    this.deltas = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1]
    ];
  }

  makeMove(pos) {
    while (pos[0] + 1 <= 5 && this.board.cells[pos[0] + 1][pos[1]] === null) {
      pos[0] += 1;
    }
    // debugger;
    this.board.updateCell(pos, this.currentPlayer);
    if (this.isOver()) {
      alert(`${this.winner} is the winner`);
    }
    this.changePlayer();

    if (this.currentPlayer === "red") {
      this.makeMove(this.computer.chooseMove(this.board));
    }
  }

  changePlayer() {
    this.currentPlayer = this.currentPlayer === "black" ? "red" : "black";
  }

  isOver() {
    let marker;
    let counter;
    let over = false;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        marker = this.board.cells[i][j];
        if (!marker) {
          continue;
        }
        let current = [i, j];
        let next;

        this.deltas.forEach(delta => {
          counter = 1;
          next = [delta[0] + i, delta[1] + j];

          while (
            next[0] >= 0 &&
            next[0] <= 5 &&
            next[1] >= 0 &&
            next[1] <= 6 &&
            this.board.cells[next[0]][next[1]] === marker
          ) {
            counter++;
            if (counter === 4) {
              this.winner = marker;
              over = true;
            }
            next = [next[0] + delta[0], next[1] + delta[1]];
          }
        });
      }
    }

    return over;
  }

  reset() {
    this.board.reset();
  }
}
