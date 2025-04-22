import { Player, CPUPlayer } from "./board.js";

class BoardHandler {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.attackInProgress = false;
  }

  playerSwitch() {
    if (!this.attackInProgress) return;
    this.player1.isCurrentPlayer = !this.player1.isCurrentPlayer;
    this.player2.isCurrentPlayer = !this.player2.isCurrentPlayer;

    if (this.player1.isCurrentPlayer) {
      this.generateGrids(
        this.player1.gameboard.grid,
        this.player2.gameboard.grid,
      );
    } else {
      this.generateGrids(
        this.player2.gameboard.grid,
        this.player1.gameboard.grid,
      );
    }

    const dialog = document.getElementById("player-switch");
    dialog.showModal();
    this.attackInProgress = false;
  }

  generateGrids(board, enemyBoard) {
    const myGrid = document.querySelector(".my");
    const enemyGrid = document.querySelector(".enemy");

    while (myGrid.firstChild || enemyGrid.firstChild) {
      myGrid.removeChild(myGrid.firstChild);
      enemyGrid.removeChild(enemyGrid.firstChild);
    }

    this.generateMyGrid(board);
    this.generateEnemyGrid(enemyBoard);
  }

  generateMyGrid(board) {
    const myGrid = document.querySelector(".my");

    for (let y = 0; y < board.length; y++) {
      const row = board[y];
      for (let x = 0; x < row.length; x++) {
        const cell = row[x];
        const square = document.createElement("div");
        square.classList.add("square");
        myGrid.appendChild(square);

        square.id = JSON.stringify({ x: x, y: y });

        if (cell.contains) {
          square.classList.add("ship");
        }

        if (cell.hit && cell.contains) {
          square.classList.add("fire");
        } else if (cell.hit) {
          square.classList.add("miss");
        }
      }
    }
  }

  generateEnemyGrid(enemyBoard) {
    const enemyGrid = document.querySelector(".enemy");

    for (let y = 0; y < enemyBoard.length; y++) {
      const row = enemyBoard[y];
      for (let x = 0; x < row.length; x++) {
        const enemyCell = row[x];
        const square = document.createElement("div");
        square.classList.add("square", "enemy");
        enemyGrid.appendChild(square);
        square.id = JSON.stringify({ x: x, y: y });

        if (enemyCell.hit && !enemyCell.contains) {
          square.classList.add("miss");
        } else if (enemyCell.hit && enemyCell.contains) {
          square.classList.add("hit");
        }

        square.addEventListener(
          "click",
          function (e) {
            if (this.attackInProgress) return;
            const coordinates = JSON.parse(e.target.id);
            let attacked = null;

            if (this.player1.isCurrentPlayer) {
              attacked = this.player2.gameboard.recieveAttack(coordinates);
            } else {
              attacked = this.player1.gameboard.recieveAttack(coordinates);
            }
            if (attacked === "hit") square.classList.add("attacked");
            if (attacked === "miss") {
              this.attackInProgress = true;
              square.classList.add("miss");
            }
            if (attacked === "all ships sunk") this.gameOver();
          }.bind(this),
        );
      }
    }
  }

  gameOver() {
    const gameOverDialog = document.querySelector("#game-over");
    gameOverDialog.showModal();
  }

  updatePlayers(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
  }
}

class ButtonsHandler {
  constructor(boardHandler, startGame) {
    (this.button1p = document.getElementById("1p")),
      (this.button2p = document.getElementById("2p"));
    this.switchPlayer = document.getElementById("switch");
    this.boardHandler = boardHandler;
    this.bindStarts();
    this.bindSwitchPlayer();
    this.bindGameOverDialog();
    this.startGame = startGame;
  }

  bindStarts() {
    this.button1p.addEventListener("click", () => this.startGame(true));
    this.button2p.addEventListener("click", () => this.startGame(false));
  }

  bindSwitchPlayer() {
    this.switchPlayer.addEventListener("click", () => {
      console.log("switch");
      this.boardHandler.playerSwitch();
    });
  }

  bindGameOverDialog() {
    const gameOverDialogBtn = document.querySelector("#game-over-btn");
    const gameOverDialog = document.querySelector("#game-over");
    gameOverDialogBtn.addEventListener("click", () => {
      gameOverDialog.close();
      this.startGame(false);
    });
  }
}

export default class GameController {
  constructor() {
    (this.player1 = new Player()),
      (this.player2 = new Player()),
      (this.boardHandler = new BoardHandler(this.player1, this.player2)),
      (this.buttonsHandler = new ButtonsHandler(
        this.boardHandler,
        this.startGame.bind(this),
      ));
  }

  startGame(is1p) {
    this.player1 = new Player();
    this.player2 = is1p ? new CPUPlayer() : new Player();

    this.boardHandler.updatePlayers(this.player1, this.player2);

    this.player1.randomizePlacement();
    this.player1.isCurrentPlayer = true;
    this.player2.randomizePlacement();

    this.boardHandler.generateGrids(
      this.player1.gameboard.grid,
      this.player2.gameboard.grid,
    );
  }
}
