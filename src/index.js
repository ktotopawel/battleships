import "./style.css";
import BoardHandler from "./domhandler.js";
import { Player, CPUPlayer } from "./board.js";

const playerOne = new Player("one");
const playerTwo = new Player("two");

playerOne.gameboard.placeShip({ x: 3, y: 0 }, { x: 5, y: 0 });

const boardHandler = new BoardHandler(playerOne, playerTwo);

boardHandler.generateGrids(playerOne.gameboard.grid, playerTwo.gameboard.grid);
