export default class Board {
  constructor() {
    this.cells = new Array();

    for (let i = 0; i < 6; i++) {
      this.cells.push(new Array(null, null, null, null, null, null, null));
    }

    this.updateCell = this.updateCell.bind(this);
  }

  reset() {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        this.cells[i][j] = null;
      }
    }
  }

  updateCell(pos, marker) {
    const row = pos[0];
    const col = pos[1];
    // const marker = player.marker;
    this.cells[row][col] = marker;
  }
}
