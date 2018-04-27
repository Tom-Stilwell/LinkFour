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
        while (!move || board.cells[move[0]][move[1]]) {
          move = [Math.floor(Math.random() * 6), Math.floor(Math.random() * 7)];
        }
        break;
      case "MEDIUM":
        break;
      case "HARD":
        break;
    }

    return move;
  }
}
