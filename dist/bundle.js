/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./board.js":
/*!******************!*\
  !*** ./board.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Board; });
class Board {
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

/***/ }),

/***/ "./computer.js":
/*!*********************!*\
  !*** ./computer.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Computer; });
class Computer {
  constructor(difficulty) {
    this.difficulty = difficulty;
    this.deltas = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];
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

          while (next[0] >= 0 && next[0] <= 5 && next[1] >= 0 && next[1] <= 6 && board.cells[next[0]][next[1]] === marker) {
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

    return move[0] >= 0 && move[0] < 6 && move[1] >= 0 && move[1] < 7 && (spaceBelow[0] > 5 || board.cells[spaceBelow[0]][spaceBelow[1]]) && !board.cells[move[0]][move[1]];
  }
}

/***/ }),

/***/ "./game-view.js":
/*!**********************!*\
  !*** ./game-view.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GameView; });
class GameView {
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
          pos: [Math.round(this.display.posX + col * this.display.width / 8), Math.round(this.display.posY + row * this.display.height / 7)],
          color: "ivory",
          row: row - 1,
          col: col - 1
        });
      }
    }
  }

  drawBoard() {
    this.ctx.clearRect(this.display.posX, this.display.posY, this.width, this.height);
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
      if (Math.sqrt(Math.pow(pos[0] - circle.pos[0], 2) + Math.pow(pos[1] - circle.pos[1], 2)) < this.radius) {
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
    this.circles.forEach(circle => circle.color = "ivory");
  }
}

/***/ }),

/***/ "./game.js":
/*!*****************!*\
  !*** ./game.js ***!
  \*****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Game; });
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./board.js");
/* harmony import */ var _computer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./computer */ "./computer.js");




class Game {
  constructor(difficulty) {
    this.currentPlayer = "black";
    this.winner = undefined;
    this.board = new _board__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.computer = new _computer__WEBPACK_IMPORTED_MODULE_1__["default"](difficulty);

    this.deltas = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];
  }

  makeMove(pos) {
    while (pos[0] + 1 <= 5 && this.board.cells[pos[0] + 1][pos[1]] === null) {
      pos[0] += 1;
    }
    // debugger;
    this.board.updateCell(pos, this.currentPlayer);
    if (this.isOver()) {
      alert(`${this.winner} is the winner`);
      this.reset();
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

          while (next[0] >= 0 && next[0] <= 5 && next[1] >= 0 && next[1] <= 6 && this.board.cells[next[0]][next[1]] === marker) {
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

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-view */ "./game-view.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./game.js");



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
    const game = new _game__WEBPACK_IMPORTED_MODULE_1__["default"]("MEDIUM");
    const gameView = new _game_view__WEBPACK_IMPORTED_MODULE_0__["default"](ctx, canvas.width - 100, canvas.height - 100, game);
    gameView.drawBoard();

    document.addEventListener("click", event => gameView.circleFillInEvent(event));
    resetButton.addEventListener("click", () => {
      // gameView.resetCircles();
      gameView.drawBoard();
      game.reset();
    });
  }

  initialRender();
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map