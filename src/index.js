import "./style.css";

import GameController from "./domhandler.js";

const newGame = new GameController();
newGame.player1.isCurrentPlayer = true;

newGame.player1.randomizePlacement();
newGame.player2.randomizePlacement();

newGame.boardHandler.generateGrids(
  newGame.player1.gameboard.grid,
  newGame.player2.gameboard.grid,
);

document.addEventListener("DOMContentLoaded", () => {
  newGame.buttonsHandler.bindStarts();
  newGame.buttonsHandler.bindSwitchPlayer();
});
