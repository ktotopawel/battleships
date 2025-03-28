class Ship {
  constructor(len) {
    (this.length = len), (this.hitCount = 0), (this.sunk = false);
  }

  hit() {
    this.hitCount++;
    this.isSunk();
  }

  isSunk() {
    if (this.hitCount >= this.length) this.sunk = true;
    return this.sunk;
  }
}

class Cell {
  constructor() {
    (this.contains = null), (this.hit = false);
  }
}

class Gameboard {
  constructor(height, width) {
    this.grid = this.generateGrid(height, width);
  }

  placeShip(start, end) {
    if (
      !Array.isArray(start) ||
      !Array.isArray(end) ||
      start[0] + 1 > this.height ||
      start[1] + 1 > this.width ||
      end[0] + 1 > this.height ||
      end[1] + 1 > this.width
    )
      throw new Error("start and end must be arrays");
  }

  generateGrid(height, width) {
    const grid = [];
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        row.push(new Cell());
      }
      grid.push(row);
    }
    return grid;
  }
}

export { Ship, Gameboard };
