import { Player, CPUPlayer } from "./board.js";

export default class BoardHandler {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
  }

  generateGrids(board, enemyBoard) {
    const myGrid = document.querySelector(".my");
    const enemyGrid = document.querySelector(".enemy");

    generateMyGrid();
    generateEnemyGrid();

    function generateEnemyGrid() {
      for (const enemyRow of enemyBoard) {
        for (const enemyCell of enemyRow) {
          const square = document.createElement("div");
          square.classList.add("square", "enemy");
          enemyGrid.appendChild(square);

          if (enemyCell.hit && !enemyCell.contains) {
            square.classList.add("miss");
          } else if (enemyCell.hit && enemyCell.contains) {
            square.classList.add("hit");
          }
        }
      }
    }

    function generateMyGrid() {
      for (const row of board) {
        for (const cell of row) {
          const square = document.createElement("div");
          square.classList.add("square");
          myGrid.appendChild(square);

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
  }
}
