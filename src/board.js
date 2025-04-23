import js from "@eslint/js";

class Ship {
  constructor(len) {
    (this.length = len), (this.hitCount = 0), (this.sunk = false);
  }

  hit() {
    this.hitCount++;
    this.isSunk();
  }

  isSunk() {
    if (this.hitCount >= this.length) {
      this.sunk = true;
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
  constructor() {
    this.grid = this.generateGrid(10, 10);
    this.height = 10;
    this.width = 10;
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
      if (this.allShipsSunk()) return "all ships sunk";
      return `hit`;
    }

    this.grid[y][x].hit = true;
    return "miss";
  }

  placeShip(start, end) {
    if (!this.validateCoordinates(start, end)) return false;

    const isHorizontal = start.y === end.y;
    const isVertical = start.x === end.x;

    if (!isHorizontal && !isVertical) throw new Error("invalid ship placement");

    const coordinateArr = [];
    const length = isHorizontal
      ? Math.abs(end.x - start.x) + 1
      : Math.abs(end.y - start.y) + 1;
    const thisShip = new Ship(length);

    if (isHorizontal) {
      for (let x = start.x; x <= end.x; x++) {
        coordinateArr.push(this.grid[start.y][x]);
      }
    } else {
      for (let y = start.y; y <= end.y; y++) {
        coordinateArr.push(this.grid[y][start.x]);
      }
    }

    if (!coordinateArr.every((cell) => !cell.contains)) return false;
    coordinateArr.forEach((cell) => (cell.contains = thisShip));
    return true;
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
  constructor(name) {
    (this.name = name),
      (this.gameboard = new Gameboard()),
      (this.isCurrentPlayer = false);
  }

  randomizePlacement() {
    const placeRandomShip = (length) => {
      const randomCoordinates = {
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10),
      };
      const isHorizontal = Math.random() > 0.5;

      const endCooridantes = isHorizontal
        ? { x: randomCoordinates.x + length - 1, y: randomCoordinates.y }
        : { x: randomCoordinates.x, y: randomCoordinates.y + length - 1 };

      if (this.gameboard.placeShip(randomCoordinates, endCooridantes)) {
        return;
      } else {
        placeRandomShip(length);
      }
    };

    placeRandomShip(1);
    placeRandomShip(1);
    placeRandomShip(2);
    placeRandomShip(2);
    placeRandomShip(3);
    placeRandomShip(4);
    placeRandomShip(5);
  }
}

class CPUPlayer extends Player {
  constructor() {
    super();
    this.hits = [];
  }

  makeMove() {
    const availableCells = [];

    // Find all unattacked cells
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        if (!this.gameboard.grid[y][x].hit) {
          availableCells.push({ x, y });
        }
      }
    }

    // Pick a random available cell
    if (availableCells.length > 0) {
      return availableCells[Math.floor(Math.random() * availableCells.length)];
    } else {
      throw new Error("No valid moves left!"); // Should never happen in a valid game
    }
  }
}

export { Ship, Gameboard, Player, CPUPlayer };
