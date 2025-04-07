export default class BoardHandler {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
  }

  playerSwitch() {
    this.player1.isCurrentPlayer = !this.player1.isCurrentPlayer;
    this.player2.isCurrentPlayer = !this.player2.isCurrentPlayer;
    setTimeout(() => {
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
    }, 3000);
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

            if (this.player1.isCurrentPlayer) {
              this.player2.gameboard.recieveAttack(coordinates);
              this.playerSwitch();
            } else {
              this.player1.gameboard.recieveAttack(coordinates);
              this.playerSwitch();
            }
          }.bind(this),
        );
      }
    }
  }
}
