import { BoardHandler, ButtonsHandler } from "./domhandler.js";
import { Player, CPUPlayer } from "./board.js";

export default class GameController {
  constructor() {
    this.player1 = new Player();
    this.player2 = new Player();
    this.boardHandler = new BoardHandler(
      this.player1,
      this.player2,
      this.handleTurn.bind(this),
    );
    this.buttonsHandler = new ButtonsHandler(
      this.boardHandler,
      this.startGame.bind(this),
      this.switchPlayers.bind(this),
    );
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

  async switchPlayers() {
    if (!this.attackInProgress) return;

    this.player1.isCurrentPlayer = !this.player1.isCurrentPlayer;
    this.player2.isCurrentPlayer = !this.player2.isCurrentPlayer;

    this.attackInProgress = false;

    if (!this.player1.isCurrentPlayer && this.player2 instanceof CPUPlayer) {
      await this.cpuTurn();
      this.player1.isCurrentPlayer = true;
      this.player2.isCurrentPlayer = false;

      this.boardHandler.generateGrids(
        this.player1.gameboard.grid,
        this.player2.gameboard.grid,
      );
      this.boardHandler.playerSwitch();
      return;
    }

    this.boardHandler.generateGrids(
      this.player1.isCurrentPlayer
        ? this.player1.gameboard.grid
        : this.player2.gameboard.grid,
      this.player1.isCurrentPlayer
        ? this.player2.gameboard.grid
        : this.player1.gameboard.grid,
    );

    this.boardHandler.playerSwitch();
  }

  handleTurn(coordinates, square) {
    if (this.attackInProgress) return;

    const enemy = this.player1.isCurrentPlayer ? this.player2 : this.player1;
    const result = enemy.gameboard.recieveAttack(coordinates);

    if (result === "hit") square.classList.add("attacked");
    if (result === "miss") {
      this.attackInProgress = true;
      square.classList.add("miss");
    }
    if (result === "all ships sunk") this.boardHandler.gameOver();
  }

  async cpuTurn() {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    while (true) {
      await delay(300);

      const cpuMove = this.player2.makeMove();
      const result = this.player1.gameboard.recieveAttack(cpuMove);

      const square = document.getElementById(JSON.stringify(cpuMove));
      if (result === "hit" && square) square.classList.add("attacked");
      if (result === "miss" && square) {
        square.classList.add("miss");
        break;
      }
      if (result === "all ships sunk") {
        this.boardHandler.gameOver();
        return;
      }
    }
  }
}
