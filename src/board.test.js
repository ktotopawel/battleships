/* eslint-disable */

import { Ship, Gameboard } from "./board";

describe("Ship", () => {
  test("should initialize with correct length and zero hits", () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
    expect(ship.hitCount).toBe(0);
  });

  test("hit() should increase the number of hits", () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.hitCount).toBe(1);
  });

  test("isSunk() should return false if hits are less than length", () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test("isSunk() should return true if hits are equal to length", () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test("isSunk() should not return true if hits exceed length", () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    ship.hit(); // Extra hit beyond length
    expect(ship.isSunk()).toBe(true);
  });
});

describe("Gameboard", () => {
  test("returns a valid gameboard", () => {
    const gameboard = new Gameboard(3, 3);
    expect(gameboard.grid.length).toBe(3);
    for (const row of gameboard.grid) {
      expect(row.length).toBe(3);
    }
  });

  test("random cell in board is a cell object", () => {
    const gameboard = new Gameboard(3, 3);
    expect(gameboard.grid[1][1]).toMatchObject({ contains: null, hit: false });
  });

  test("throws invalid on invalid ship placement", () => {
    const gameboard = new Gameboard(3, 3);
    expect(() => gameboard.placeShip({ x: 0, y: 1 }, { x: 3, y: 1 })).toThrow();
  });

  test("placing a ship", () => {
    const gameboard = new Gameboard(3, 3);
    gameboard.placeShip({ x: 1, y: 1 }, { x: 1, y: 2 });
    expect(gameboard.grid[1][1].contains).toMatchObject({
      length: 2,
      hitCount: 0,
      sunk: false,
    });
    expect(gameboard.grid[2][1].contains).toMatchObject({
      length: 2,
      hitCount: 0,
      sunk: false,
    });
  });

  describe("validate array", () => {
    const gameboard = new Gameboard(3, 3);

    test("returns false with invalid coordinates", () => {
      expect(gameboard.validateCoordinates({ x: 0, y: 3 })).toBe(false);
    });

    test("returns true with valid coordinates", () => {
      expect(gameboard.validateCoordinates({ x: 0, y: 1 })).toBe(true);
    });

    test("true for multiple coordinates", () => {
      expect(
        gameboard.validateCoordinates({ x: 1, y: 1 }, { x: 1, y: 2 }),
      ).toBe(true);
    });

    test("false with multiple coordinates", () => {
      expect(
        gameboard.validateCoordinates({ x: 1, y: 1 }, { x: 1, y: 3 }),
      ).toBe(false);
    });
  });
});
