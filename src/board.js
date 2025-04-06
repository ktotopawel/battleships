class Ship {
  constructor(len) {
    (this.length = len), (this.hitCount = 0), (this.sunk = false);
  }

  hit() {
    this.hitCount++;
    console.log(this.length, this.hitCount);
    this.isSunk();
  }

  isSunk() {
    if (this.hitCount >= this.length) {
      this.sunk = true;
      console.log(`ship (${this.length}) sunk`);
    }
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

  allShipsSunk() {
    return this.grid.flat().every((cell) => {
      return cell.contains ? cell.contains.sunk : true;
    });
  }

  recieveAttack(coordinates) {
    const y = coordinates.y;
    const x = coordinates.x;
    if (this.grid[y][x].hit === true) return "already hit";

    if (this.grid[y][x].contains !== null) {
      const ship = this.grid[y][x].contains;
      ship.hit();
      this.grid[y][x].hit = true;
      console.log(`ship (${ship.length}) hit`);
      if (this.allShipsSunk()) return "all ships sunk";
      return `hit`;
    }

    this.grid[y][x].hit = true;
    return "miss";
  }

  placeShip(start, end) {
    if (!this.validateCoordinates(start, end))
      throw new Error("invalid coordinates");

    const isHorizontal = start.x === end.x;
    const isVertical = start.y === end.y;

    if (!isHorizontal && !isVertical) throw new Error("invalid ship placement");

    if (isHorizontal) {
      const length = Math.abs(end.y - start.y + 1);
      const thisShip = new Ship(length);
      for (let y = start.y; y <= end.y; y++) {
        this.grid[y][start.x].contains = thisShip;
      }
    } else {
      const length = Math.abs(end.x - start.x + 1);
      const thisShip = new Ship(length);
      for (let x = start.x; x <= end.x; x++) {
        this.grid[x][start.y].contains = thisShip;
      }
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

class Player {
  constructor(name, boardSize = 10) {
    (this.name = name), (this.gameboard = new Gameboard(boardSize, boardSize));
  }
}

class CPUPlayer extends Player {
  constructor(name = "CPU", boardSize = 10) {
    super(name, boardSize);
  }
}

export { Ship, Gameboard, Player, CPUPlayer };
