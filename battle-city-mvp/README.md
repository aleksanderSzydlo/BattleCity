# Battle City MVP

A minimal playable prototype of the classic Battle City (Tank 1990) game built with vanilla JavaScript and HTML5 Canvas.

## Features

- Player-controlled tank with 4-directional movement
- 3 enemy tanks with simple AI (random movement and shooting)
- Shooting mechanics with cooldowns
- Collision detection (tanks vs walls, bullets vs tanks, bullets vs walls)
- Brick walls (destructible) and steel walls (indestructible)
- Base protection objective
- Lives system (3 lives)
- Win/lose conditions
- HUD showing lives and enemy count
- Restart functionality

## How to Play

1. Open `index.html` in a modern web browser
2. Use **Arrow Keys** to move your tank (yellow)
3. Press **Spacebar** to shoot
4. Destroy all enemy tanks (red) to win
5. Don't let enemies destroy your base (green)
6. Press **R** to restart after game over or win

## Controls

- **↑ ↓ ← →** - Move tank
- **Space** - Shoot
- **R** - Restart (after game over/win)

## Game Rules

- You have 3 lives
- Lose a life when hit by enemy bullet
- Game over if you lose all lives OR if base is destroyed
- Win by destroying all enemy tanks
- Brick walls can be destroyed by bullets
- Steel walls are indestructible

## Project Structure

```
battle-city-mvp/
├── index.html          # Entry point
├── styles.css          # Basic styling
├── src/
│   ├── constants.js    # Game constants
│   ├── input.js        # Keyboard input handler
│   ├── entities.js     # Tank, Bullet, Wall, Base classes
│   ├── collision.js    # Collision detection
│   ├── renderer.js     # Canvas rendering
│   └── main.js         # Game loop and logic
└── README.md
```

## Technical Details

- **Technology**: Vanilla JavaScript (ES6 modules), HTML5 Canvas
- **Canvas Size**: 512×448 pixels
- **Target FPS**: 60
- **Entity Sizes**: Tank 16×16, Bullet 4×4, Wall 8×8
- **No dependencies** - runs directly in browser

## Development

No build tools required! Simply:
1. Clone/download the files
2. Open `index.html` in a browser
3. Start playing

For development, use a local server to avoid CORS issues with ES6 modules:
```bash
python3 -m http.server 8000
# Then open http://localhost:8000
```

## Future Enhancements

- Better graphics (sprites instead of rectangles)
- Sound effects
- Multiple enemy types
- Power-ups
- Multiple levels
- Score system
- Smoother tank rotation animations

## License

MIT - Feel free to use and modify!
