import "./style.css";
import BoardHandler from "./domhandler.js";
import { Player, CPUPlayer } from "./board.js";

const playerOne = new Player("one");
const playerTwo = new Player("two");

playerOne.gameboard.placeShip({ y: 2, x: 5 }, { y: 5, x: 5 });
playerTwo.gameboard.placeShip({ y: 3, x: 3 }, { y: 3, x: 3 });
playerTwo.gameboard.recieveAttack({ y: 3, x: 3 });
playerTwo.gameboard.recieveAttack({ y: 5, x: 5 });
playerOne.gameboard.recieveAttack({ y: 2, x: 5 });
playerOne.gameboard.recieveAttack({ y: 1, x: 1 });

const boardHandler = new BoardHandler(playerOne, playerTwo);

boardHandler.generateGrids(playerOne.gameboard.grid, playerTwo.gameboard.grid);
