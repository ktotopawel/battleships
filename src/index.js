import "./style.css";
// import BoardHandler, { ButtonsHandler } from "./domhandler.js";
// import { Player } from "./board.js";

// const playerOne = new Player("one");
// const playerTwo = new Player("two");

// playerOne.isCurrentPlayer = true;

// const boardHandler = new BoardHandler(playerOne, playerTwo);

// playerOne.gameboard.placeShip({ y: 0, x: 0 }, { y: 0, x: 1 });
// playerOne.gameboard.placeShip({ y: 0, x: 3 }, { y: 2, x: 3 });
// playerOne.gameboard.placeShip({ y: 0, x: 6 }, { y: 0, x: 9 });
// playerOne.gameboard.placeShip({ y: 2, x: 0 }, { y: 5, x: 0 });
// playerOne.gameboard.placeShip({ y: 2, x: 5 }, { y: 2, x: 7 });
// playerOne.gameboard.placeShip({ y: 2, x: 9 }, { y: 3, x: 9 });
// playerOne.gameboard.placeShip({ y: 5, x: 5 }, { y: 6, x: 5 });
// playerOne.gameboard.placeShip({ y: 5, x: 9 }, { y: 7, x: 9 });
// playerOne.gameboard.placeShip({ y: 7, x: 0 }, { y: 7, x: 1 });
// playerOne.gameboard.placeShip({ y: 9, x: 4 }, { y: 9, x: 9 });

// playerTwo.gameboard.placeShip({ y: 0, x: 0 }, { y: 0, x: 1 });
// playerTwo.gameboard.placeShip({ y: 0, x: 3 }, { y: 2, x: 3 });
// playerTwo.gameboard.placeShip({ y: 0, x: 6 }, { y: 0, x: 9 });
// playerTwo.gameboard.placeShip({ y: 2, x: 0 }, { y: 5, x: 0 });
// playerTwo.gameboard.placeShip({ y: 2, x: 5 }, { y: 2, x: 7 });
// playerTwo.gameboard.placeShip({ y: 2, x: 9 }, { y: 3, x: 9 });
// playerTwo.gameboard.placeShip({ y: 5, x: 5 }, { y: 6, x: 5 });
// playerTwo.gameboard.placeShip({ y: 5, x: 9 }, { y: 7, x: 9 });
// playerTwo.gameboard.placeShip({ y: 7, x: 0 }, { y: 7, x: 1 });
// playerTwo.gameboard.placeShip({ y: 9, x: 4 }, { y: 9, x: 9 });

// boardHandler.generateGrids(playerOne.gameboard.grid, playerTwo.gameboard.grid);

// document.addEventListener("DOMContentLoaded", () => {
//   const btns = new ButtonsHandler();
//   btns.bindStarts();
//   btns.bindSwitchPlayer();
// });

import GameController from "./domhandler.js";

const newGame = new GameController();
newGame.player1.isCurrentPlayer = true;

newGame.player1.gameboard.placeShip({ y: 0, x: 0 }, { y: 0, x: 1 });
newGame.player1.gameboard.placeShip({ y: 0, x: 3 }, { y: 2, x: 3 });
newGame.player1.gameboard.placeShip({ y: 0, x: 6 }, { y: 0, x: 9 });
newGame.player1.gameboard.placeShip({ y: 2, x: 0 }, { y: 5, x: 0 });
newGame.player1.gameboard.placeShip({ y: 2, x: 5 }, { y: 2, x: 7 });
newGame.player1.gameboard.placeShip({ y: 2, x: 9 }, { y: 3, x: 9 });
newGame.player1.gameboard.placeShip({ y: 5, x: 5 }, { y: 6, x: 5 });
newGame.player1.gameboard.placeShip({ y: 5, x: 9 }, { y: 7, x: 9 });
newGame.player1.gameboard.placeShip({ y: 7, x: 0 }, { y: 7, x: 1 });
newGame.player1.gameboard.placeShip({ y: 9, x: 4 }, { y: 9, x: 9 });

newGame.player2.gameboard.placeShip({ y: 0, x: 0 }, { y: 0, x: 1 });
newGame.player2.gameboard.placeShip({ y: 0, x: 3 }, { y: 2, x: 3 });
newGame.player2.gameboard.placeShip({ y: 0, x: 6 }, { y: 0, x: 9 });
newGame.player2.gameboard.placeShip({ y: 2, x: 0 }, { y: 5, x: 0 });
newGame.player2.gameboard.placeShip({ y: 2, x: 5 }, { y: 2, x: 7 });
newGame.player2.gameboard.placeShip({ y: 2, x: 9 }, { y: 3, x: 9 });
newGame.player2.gameboard.placeShip({ y: 5, x: 5 }, { y: 6, x: 5 });
newGame.player2.gameboard.placeShip({ y: 5, x: 9 }, { y: 7, x: 9 });
newGame.player2.gameboard.placeShip({ y: 7, x: 0 }, { y: 7, x: 1 });
newGame.player2.gameboard.placeShip({ y: 9, x: 4 }, { y: 9, x: 9 });

newGame.boardHandler.generateGrids(
  newGame.player1.gameboard.grid,
  newGame.player2.gameboard.grid,
);

document.addEventListener("DOMContentLoaded", () => {
  newGame.buttonsHandler.bindStarts();
  newGame.buttonsHandler.bindSwitchPlayer();
});
