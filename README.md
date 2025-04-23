# Battleships Game

## Overview

This is a web-based implementation of the classic Battleships game. Players can compete against each other or play against a CPU opponent. The game features a grid-based interface where players place their ships and take turns attacking their opponent's grid.

## Features

- **Single Player Mode**: Play against a CPU opponent with randomized ship placement and attack logic.
- **Two Player Mode**: Play against another human player.
- **Randomized Ship Placement**: Ships are placed randomly on the grid for both players.
- **Interactive UI**: Click on the grid to attack and see the results in real-time.
- **Game Over Dialog**: Displays the winner when all ships of one player are sunk.

## Demo

You can try the live demo of the Battleships game here:
[https://ktotopawel.github.io/battleships/](https://ktotopawel.github.io/battleships/)

## How to Play

1. **Start the Game**:
   - Click the "1 Player" button to play against the CPU.
   - Click the "2 Player" button to play against another human.
2. **Place Ships**:
   - Ships are placed randomly for both players.
3. **Take Turns**:
   - Player 1 starts the game.
   - Click on the enemy grid to attack a cell.
   - If you hit a ship, you can continue attacking.
   - If you miss, the turn switches to the other player.
4. **Win the Game**:
   - Sink all of your opponent's ships to win.

## Project Structure

```
babel.config.js
eslint.config.mjs
jest.config.js
package.json
README.md
webpack.common.js
webpack.dev.js
webpack.prod.js
src/
  board.js
  board.test.js
  domhandler.js
  gamecontroller.js
  index.js
  style.css
  template.html
```

### Key Files

- **`src/board.js`**: Contains the logic for the gameboard, ships, and players.
- **`src/domhandler.js`**: Handles the DOM interactions and UI updates.
- **`src/gamecontroller.js`**: Manages the game flow and player turns.
- **`src/index.js`**: Entry point for the application.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd battleships
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the development server:
   ```bash
   npm run start
   ```
2. Open your browser and navigate to `http://localhost:8080`.

## Scripts

- `npm run start`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run test`: Run the test suite.

## Technologies Used

- **JavaScript**: Core game logic and interactivity.
- **HTML/CSS**: User interface and styling.
- **Webpack**: Module bundler for development and production builds.
- **Jest**: Testing framework for unit tests.

## Future Improvements

- Add difficulty levels for the CPU.
- Allow manual ship placement by players.
- Add animations for attacks and hits.
- Improve the UI/UX with better styling and responsiveness.

## License

This project is licensed under the MIT License.
