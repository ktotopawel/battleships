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
  constructor(name, boardSize = 10) {
    (this.name = name),
      (this.gameboard = new Gameboard(boardSize, boardSize)),
      (this.isCurrentPlayer = false);
  }

  randomizePlacement() {
    const placeRandomShip = (length) => {
      const randomCoordinates = {
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10),
      };
      const isHorizontal = Math.random > 0.5 ? true : false;

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
  constructor(name = "CPU", boardSize = 10) {
    super(name, boardSize);
  }
}

export { Ship, Gameboard, Player, CPUPlayer };
