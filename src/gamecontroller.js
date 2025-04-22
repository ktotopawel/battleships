import { BoardHandler, ButtonsHandler } from "./domhandler.js";
import { Player, CPUPlayer } from "./board.js";

export default class GameController {
  constructor() {
    (this.player1 = new Player()),
      (this.player2 = new Player()),
      (this.boardHandler = new BoardHandler(
        this.player1,
        this.player2,
        this.handleTurn.bind(this),
      )),
      (this.buttonsHandler = new ButtonsHandler(
        this.boardHandler,
        this.startGame.bind(this),
        this.switchPlayers.bind(this),
      ));
    this.attackInProgress = false;
  }

  startGame(is1p) {
    this.player1 = new Player();
    this.player2 = is1p ? new CPUPlayer() : new Player();

    this.boardHandler.updatePlayers(this.player1, this.player2, this);

    this.player1.randomizePlacement();
    this.player1.isCurrentPlayer = true;
    this.player2.randomizePlacement();

    this.boardHandler.generateGrids(
      this.player1.gameboard.grid,
      this.player2.gameboard.grid,
    );
  }

  switchPlayers() {
    if (!this.attackInProgress) return;
    this.player1.isCurrentPlayer = !this.player1.isCurrentPlayer;
    this.player2.isCurrentPlayer = !this.player2.isCurrentPlayer;

    if (this.player1.isCurrentPlayer) {
      this.boardHandler.generateGrids(
        this.player1.gameboard.grid,
        this.player2.gameboard.grid,
      );
    } else {
      this.boardHandler.generateGrids(
        this.player2.gameboard.grid,
        this.player1.gameboard.grid,
      );
    }

    this.boardHandler.playerSwitch();
    this.attackInProgress = false;
  }

  handleTurn(coordinates, square) {
    if (this.attackInProgress) return;
    const enemy = this.player1.isCurrentPlayer ? this.player2 : this.player1;
    let result = enemy.gameboard.recieveAttack(coordinates);

    if (result === "hit") square.classList.add("attacked");
    if (result === "miss") {
      this.attackInProgress = true;
      square.classList.add("miss");
    }
    if (result === "all ships sunk") this.boardHandler.gameOver();
  }
}
