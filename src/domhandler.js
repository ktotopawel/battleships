export class BoardHandler {
  constructor(player1, player2, handleTurn) {
    this.player1 = player1;
    this.player2 = player2;
    this.handleTurn = handleTurn;
  }

  playerSwitch() {
    const dialog = document.getElementById("player-switch");
    dialog.showModal();
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
            const coordinates = JSON.parse(e.target.id);
            this.handleTurn(coordinates, square);
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

export class ButtonsHandler {
  constructor(boardHandler, startGame, switchPlayersFn) {
    (this.button1p = document.getElementById("1p")),
      (this.button2p = document.getElementById("2p"));
    this.switchPlayer = document.getElementById("switch");
    this.boardHandler = boardHandler;
    this.bindStarts();
    this.bindSwitchPlayer();
    this.bindGameOverDialog();
    this.startGame = startGame;
    this.switchPlayersFn = switchPlayersFn;
  }

  bindStarts() {
    this.button1p.addEventListener("click", () => this.startGame(true));
    this.button2p.addEventListener("click", () => this.startGame(false));
  }

  bindSwitchPlayer() {
    this.switchPlayer.addEventListener("click", () => {
      this.switchPlayersFn();
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
