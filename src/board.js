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
    this.height = height;
    this.width = width;
  }

  placeShip(start, end) {
    if (!this.validateCoordinates(start, end))
      throw new Error("invalid coordinates");

    const cellArr = [];
    let shipLength = 0;

    if (start.x < end.x) {
      shipLength = end.x - start.x + 1;
      for (let i = start.x; i < shipLength; i++) {
        cellArr.push(this.grid[start.y][i]);
      }
    } else if (start.y < end.y) {
      shipLength = end.y - start.y + 1;
      for (let i = start.x; i < shipLength; i++) {
        cellArr.push(this.grid[i][start.x]);
      }
    } else if (JSON.stringify(start) === JSON.stringify(end)) {
      shipLength = 1;
      cellArr.push(this.grid[start.y][start.x]);
    } else {
      throw new Error("impossible ship placement");
    }

    console.log(cellArr);

    const thisShip = new Ship(shipLength);

    for (let i = 0; i < cellArr.length; i++) {
      const cell = cellArr[i];
      cell.contains = thisShip;
    }
  }

  validateCoordinates(...args) {
    const xArr = [];
    const yArr = [];
    for (let i = 0; i < args.length; i++) {
      const element = args[i];
      xArr.push(element.x);
      yArr.push(element.y);
    }

    return (
      xArr.every((x) => x < this.grid[0].length && x >= 0) &&
      yArr.every((y) => y < this.grid.length && y >= 0)
    );
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
