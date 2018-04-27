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
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./player.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_player__WEBPACK_IMPORTED_MODULE_1__);



class Game {
  constructor() {
    this.currentPlayer = "black";
    this.winner = undefined;
    this.board = new _board__WEBPACK_IMPORTED_MODULE_0__["default"]();

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
    }
    this.changePlayer();
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
/* harmony import */ var _game_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-view.js */ "./game-view.js");
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game.js */ "./game.js");



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
    const game = new _game_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    const gameView = new _game_view_js__WEBPACK_IMPORTED_MODULE_0__["default"](ctx, canvas.width - 100, canvas.height - 100, game);
    gameView.drawBoard();

    document.addEventListener("click", event => gameView.circleFillInEvent(event));
    resetButton.addEventListener("click", () => {
      gameView.resetCircles();
      gameView.drawBoard();
      game.reset();
    });
  }

  initialRender();
});

/***/ }),

/***/ "./player.js":
/*!*******************!*\
  !*** ./player.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map