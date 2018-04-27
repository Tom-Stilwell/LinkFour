export default class Computer {
  constructor(difficulty) {
    this.difficulty = difficulty;
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

  constructTree() {}

  searchTree() {}

  chooseMove(board) {
    let move;
    switch (this.difficulty) {
      case "EASY":
        move = this.randomEmptyCell(board);
        break;
      case "MEDIUM":
        move = this.blockOrWin(board);
        break;
      case "HARD":
        break;
    }

    return move;
  }

  randomEmptyCell(board) {
    let move;
    while (!move || board.cells[move[0]][move[1]]) {
      move = [Math.floor(Math.random() * 6), Math.floor(Math.random() * 7)];
    }

    return move;
  }

  blockOrWin(board) {
    let move = this.randomEmptyCell(board);
    // debugger;
    let marker;
    let counter;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        marker = board.cells[i][j];
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
            board.cells[next[0]][next[1]] === marker
          ) {
            counter++;
            next = [next[0] + delta[0], next[1] + delta[1]];
            if (counter === 3 && this.isValidMove(board, next)) {
              move = next;
            }
          }
        });
      }
    }

    return move;
  }

  isValidMove(board, move) {
    let spaceBelow = [move[0] + 1, move[1]];
    // debugger;

    return (
      move[0] >= 0 &&
      move[0] < 6 &&
      move[1] >= 0 &&
      move[1] < 7 &&
      (spaceBelow[0] > 5 || board.cells[spaceBelow[0]][spaceBelow[1]]) &&
      !board.cells[move[0]][move[1]]
    );
  }
}
