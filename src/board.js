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

  placeShip(start, end, orientation) {
    const len =
      orientation === "horizontal"
        ? end[1] - start[1] + 1
        : end[0] - start[0] + 1;
    const thisShip = new Ship(len);
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
