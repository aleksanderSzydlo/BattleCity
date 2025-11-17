# Battle City Constitution

## Core Principles

### I. Canvas-Based Rendering
All game graphics must be rendered using HTML5 Canvas for optimal performance and pixel-perfect control. Use requestAnimationFrame for smooth 60 FPS gameplay.

### II. Component Architecture
Game entities (tanks, bullets, walls, power-ups) implemented as reusable, testable components with clear interfaces. Each component manages its own state, rendering, and collision detection.

### III. Faithful Recreation
Preserve original Battle City mechanics: grid-based movement (8x8 pixel tiles), tank rotation in 90° increments, classic power-up system, and authentic enemy AI behaviors.

### IV. Responsive Controls
Keyboard controls must be responsive with no input lag. Support WASD and arrow keys. Allow diagonal movement requests but execute based on grid alignment.

### V. Performance First
Maintain 60 FPS on modern browsers. Optimize collision detection, minimize DOM manipulation, use sprite sheets for graphics, and implement efficient game loop.

## Technical Standards

### Technology Stack
- Vanilla JavaScript (ES6+) or TypeScript for type safety
- HTML5 Canvas API for rendering
- No heavy frameworks required - keep bundle size minimal
- Optional: Vite or similar for development tooling

### Game Architecture
- Game loop with fixed time step for consistent physics
- Separation of update logic and render logic
- State management for game phases (menu, gameplay, pause, game over)
- Collision detection using grid-based spatial partitioning

### Code Quality
- Modular code with single responsibility principle
- Clear naming conventions for game entities and functions
- Comments for complex game logic (AI, collision, power-ups)
- Keep functions small and testable

## Development Workflow

### Implementation Priority
1. Core game loop and rendering system
2. Player tank with movement and shooting
3. Grid-based collision detection
4. Destructible walls (brick and steel)
5. Enemy tanks with basic AI
6. Base protection mechanics
7. Power-ups and scoring system

### Testing Approach
Manual testing for gameplay feel and mechanics. Focus on edge cases: collision at grid boundaries, simultaneous bullet impacts, power-up interactions.

## Governance

Game must stay true to Battle City's classic feel while using modern web technologies. Any deviations from original mechanics must preserve game balance and player experience.

**Version**: 1.0.0 | **Ratified**: 2025-11-17 | **Last Amended**: 2025-11-17
