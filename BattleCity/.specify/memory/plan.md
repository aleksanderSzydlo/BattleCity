# Implementation Plan: Battle City MVP - Minimal Playable Prototype

**Branch**: `main` | **Date**: 2025-11-17 | **Spec**: [spec.md](./spec.md)

## Summary

Minimal playable Battle City prototype: player tank vs 1-3 enemy tanks, protect the base. Core mechanics: movement, shooting, collision, win/lose conditions. Tech stack: HTML5 + Vanilla JavaScript + Canvas for maximum simplicity and browser compatibility.

## Technical Context

**Language/Version**: Vanilla JavaScript (ES6), no build tools  
**Primary Dependencies**: None (pure HTML5 + Canvas)  
**Storage**: None (no persistence needed for MVP)  
**Testing**: Manual browser testing  
**Target Platform**: Modern browsers (Chrome 90+, Firefox 88+, Safari 14+)  
**Project Type**: Single-page web application  
**Performance Goals**: 60 FPS, instant load (<1s)  
**Constraints**: <10 entities on screen, simple AABB collision  
**Scale/Scope**: ~500 LOC, single level, 1 enemy type

## Constitution Check

✅ **Canvas-Based Rendering**: All rendering uses HTML5 Canvas 2D  
✅ **Component Architecture**: Entities as separate classes  
✅ **Responsive Controls**: Direct keyboard event handling  
✅ **Performance First**: Minimal entities, simple collision  
✅ **Technology Stack**: Vanilla JS + Canvas (minimal)  

**Gate Status**: APPROVED - MVP aligns with constitution

## Project Structure

### Source Code

```text
battle-city-mvp/
├── index.html              # Entry point with canvas
├── styles.css              # Basic centering and layout
├── src/
│   ├── constants.js        # Game constants (sizes, speeds, colors)
│   ├── input.js            # InputHandler class
│   ├── entities.js         # Tank, Bullet, Wall, Base classes
│   ├── collision.js        # CollisionDetector class
│   ├── renderer.js         # Renderer class
│   └── main.js             # Game initialization and loop
└── README.md               # Instructions to run
```

## Implementation Phases

### Phase 1: Project Setup & Rendering Foundation (1-2 hours)

**Goal**: Create project structure and get basic rendering working

**Tasks**:
1. Create `index.html` with canvas element (512×448px)
2. Create `styles.css` for canvas centering
3. Create `src/constants.js` with game constants:
   - Canvas dimensions (512×448)
   - Entity sizes (tank 16×16, bullet 4×4, wall 8×8)
   - Colors (player yellow, enemy red, brick brown, steel gray)
   - Speeds (player 2px/frame, enemy 1px/frame, bullet 4px/frame)
4. Create `src/renderer.js` with Renderer class:
   - `clear()` - clear canvas
   - `drawRect(x, y, w, h, color)` - draw filled rectangle
   - `drawText(text, x, y)` - draw text for HUD
5. Create `src/main.js` with basic game loop:
   - Initialize canvas and renderer
   - Start requestAnimationFrame loop
   - Test: render colored rectangles at 60 FPS

**Dependencies**: None (foundational)

**Validation**:
- [ ] Canvas renders in browser
- [ ] Can draw colored rectangles
- [ ] Game loop runs at ~60 FPS (check with console.log)

**Risks**: LOW - Standard HTML5/Canvas setup

**Milestone**: ✅ Rendering foundation ready

---

### Phase 2: Player Tank Mechanics (2-3 hours)

**Goal**: Player can control a tank that moves and shoots

**Tasks**:
6. Create `src/input.js` with InputHandler class:
   - Track arrow keys (up/down/left/right) and spacebar
   - `isKeyPressed(key)` method
   - `update()` method to capture key states
7. Create `src/entities.js` with Tank class:
   - Properties: x, y, width, height, direction, speed, type
   - `move(dx, dy)` method
   - `rotate(newDirection)` method  
   - `shoot()` method (returns Bullet if can shoot)
   - Shooting cooldown (prevent spam)
8. Create Bullet class in `src/entities.js`:
   - Properties: x, y, width, height, direction, speed, owner
   - `update()` method to move forward
   - Auto-destroy when off-screen
9. Update `src/main.js`:
   - Create player tank at bottom center (x: 248, y: 400)
   - Handle input: arrow keys → rotate + move player
   - Handle spacebar → create bullet
   - Update bullets (move forward each frame)
   - Render player tank and bullets
10. Add simple boundary collision (prevent moving off-screen)

**Dependencies**: Phase 1 (rendering system must exist)

**Validation**:
- [ ] Player tank moves in 4 directions with arrow keys
- [ ] Tank rotates to face movement direction
- [ ] Spacebar shoots bullet in facing direction
- [ ] Bullet travels across screen
- [ ] Player cannot move off-screen edges

**Risks**: LOW - Basic input and movement

**Milestone**: ✅ Player tank fully functional (move + shoot)

---

### Phase 3: Enemy Tank & AI (2 hours)

**Goal**: Add enemy tank that moves randomly and shoots

**Tasks**:
11. Extend Tank class to support enemy type:
    - Different color (red for enemy)
    - Spawn at top of screen (x: 248, y: 32)
12. Implement simple AI in `src/main.js`:
    - Random direction change every 2-3 seconds
    - Random shooting every 2-3 seconds
    - Store timers for each enemy tank
13. Update game loop to handle enemy tanks:
    - Update enemy positions
    - Update enemy AI timers
    - Trigger random direction changes
    - Trigger random shooting
14. Render enemy tanks and their bullets
15. Test with 1-3 enemy tanks on screen

**Dependencies**: Phase 2 (Tank class must be complete)

**Validation**:
- [ ] Enemy tank spawns at top of screen
- [ ] Enemy moves randomly (changes direction periodically)
- [ ] Enemy shoots randomly (bullets fire periodically)
- [ ] Multiple enemies can exist simultaneously
- [ ] Enemy bullets are visually distinct from player bullets (or same is fine for MVP)

**Risks**: MEDIUM - Random AI might get stuck or behave oddly
**Mitigation**: Add direction change on boundary collision

**Milestone**: ✅ Enemy tank works (moves + shoots randomly)

---

### Phase 4: Map, Collisions & Game Over (3-4 hours)

**Goal**: Add walls, base, collision detection, and win/lose conditions

**Tasks**:
16. Create Wall class in `src/entities.js`:
    - Properties: x, y, width, height, type (brick/steel), destructible
    - `takeDamage()` method (destroy if brick, ignore if steel)
17. Create Base class in `src/entities.js`:
    - Properties: x, y, width, height, destroyed
    - `takeDamage()` method (set destroyed = true)
18. Create hardcoded level layout in `src/main.js`:
    - Grid of brick and steel walls
    - Base at bottom center (x: 248, y: 416)
    - Instantiate Wall objects from layout
19. Create `src/collision.js` with CollisionDetector class:
    - `checkAABB(rect1, rect2)` - axis-aligned bounding box collision
    - `checkBulletTankCollision(bullets, tanks)` - destroy tank if hit
    - `checkBulletWallCollision(bullets, walls)` - destroy bullet/wall
    - `checkBulletBaseCollision(bullets, base)` - destroy base if hit
    - `checkTankWallCollision(tank, walls)` - block movement
    - `checkBulletBulletCollision(bullets)` - destroy both bullets
20. Integrate collision detection in game loop:
    - Check all collisions each frame
    - Handle destruction (remove from entity arrays)
    - Block tank movement if wall collision
21. Implement player lives system (start with 3):
    - Player hit by bullet → lose 1 life
    - 0 lives → game over
22. Implement game state management:
    - States: PLAYING, GAME_OVER, WIN
    - Check win condition: all enemies destroyed → WIN
    - Check lose conditions: base destroyed OR player 0 lives → GAME_OVER
23. Add HUD rendering:
    - Display "Lives: X" at top-left
    - Display "Enemies: X" at top-right
    - Display "GAME OVER" or "YOU WIN" in center when game ends
24. Add restart functionality:
    - Press R to restart after game over/win
    - Reset all entities, lives, game state

**Dependencies**: Phases 1, 2, 3 (all entities must exist)

**Validation**:
- [ ] Walls render on screen (brick brown, steel gray)
- [ ] Base renders at bottom center
- [ ] Player bullets destroy enemy tanks
- [ ] Enemy bullets destroy player tank (lose life)
- [ ] Bullets destroy brick walls
- [ ] Bullets bounce off steel walls
- [ ] Tank movement blocked by walls
- [ ] Base destruction triggers GAME_OVER
- [ ] Player 0 lives triggers GAME_OVER
- [ ] All enemies destroyed triggers WIN
- [ ] HUD shows lives and enemy count
- [ ] Can restart with R key

**Risks**: 
- HIGH: Collision detection bugs (missed collisions, false positives)
- MEDIUM: Bullet-bullet collision might be tricky

**Mitigation**: 
- Extensive manual testing of all collision scenarios
- Add visual debug rectangles to verify collision boxes
- Test edge cases: bullets at screen edges, corners, simultaneous hits

**Milestone**: ✅ COMPLETE MVP - Fully playable game

---

## Phase Dependencies (Sequential)

```
Phase 1 (Setup & Rendering)
    ↓
Phase 2 (Player Mechanics)
    ↓
Phase 3 (Enemy AI)
    ↓
Phase 4 (Collisions & Game Over)
```

**Critical Path**: Must complete phases in order (each depends on previous)

---

## Milestones & Checkpoints

### Milestone 1: Rendering Works (End of Phase 1)
**Time**: 1-2 hours  
**Criteria**:
- [ ] Canvas displays in browser
- [ ] Can draw colored rectangles
- [ ] Game loop runs smoothly

**Demo**: Show canvas with test rectangles

---

### Milestone 2: Player Tank Playable (End of Phase 2)
**Time**: 3-5 hours total  
**Criteria**:
- [ ] Player tank moves with arrow keys
- [ ] Player shoots bullets with spacebar
- [ ] Bullets travel across screen
- [ ] Tank cannot leave screen boundaries

**Demo**: Player can move tank around and shoot

---

### Milestone 3: Enemy Tank Active (End of Phase 3)
**Time**: 5-7 hours total  
**Criteria**:
- [ ] Enemy tank spawns and moves randomly
- [ ] Enemy shoots bullets randomly
- [ ] Multiple enemies supported
- [ ] Player and enemy bullets visible

**Demo**: Player vs enemy tanks (no collision yet)

---

### Milestone 4: Complete MVP (End of Phase 4)
**Time**: 8-11 hours total  
**Criteria**:
- [ ] Full collision detection works
- [ ] Walls and base render
- [ ] Game over triggers correctly
- [ ] Win condition works
- [ ] HUD displays game state
- [ ] Can restart game

**Demo**: Fully playable Battle City MVP! 🎉

---

## Testing Strategy

### Manual Testing Checklist

**Phase 1**:
- [ ] Open index.html in browser (no errors in console)
- [ ] Canvas displays centered on screen
- [ ] Colored rectangles render at 60 FPS

**Phase 2**:
- [ ] Arrow up → tank moves up
- [ ] Arrow down → tank moves down
- [ ] Arrow left → tank moves left
- [ ] Arrow right → tank moves right
- [ ] Spacebar → bullet shoots in facing direction
- [ ] Can't shoot multiple bullets rapidly (cooldown works)
- [ ] Tank stops at screen edges

**Phase 3**:
- [ ] Enemy tank appears at spawn location
- [ ] Enemy changes direction periodically
- [ ] Enemy shoots bullets periodically
- [ ] Enemy doesn't get stuck at edges
- [ ] Multiple enemies work simultaneously

**Phase 4**:
- [ ] Player bullet hits enemy → enemy disappears
- [ ] Enemy bullet hits player → player loses life
- [ ] Bullet hits brick wall → both destroyed
- [ ] Bullet hits steel wall → bullet destroyed, wall intact
- [ ] Tank can't move through walls
- [ ] Two bullets collide → both destroyed
- [ ] Base hit by bullet → "GAME OVER" displays
- [ ] Player loses all lives → "GAME OVER" displays
- [ ] All enemies destroyed → "YOU WIN" displays
- [ ] Press R → game restarts correctly

### Performance Testing

- [ ] Maintain 60 FPS with 3 enemies + player + 5 bullets + 50 walls
- [ ] No lag when bullets hit walls
- [ ] No memory leaks (play for 5 minutes, check browser memory)

---

## Risk Assessment

### Critical Risks

**1. Collision Detection Accuracy (HIGH)**
- **Problem**: Bullets might phase through entities at high speed
- **Mitigation**: 
  - Keep bullet speed moderate (4px/frame)
  - Use generous collision boxes
  - Test thoroughly with rapid shooting
- **Contingency**: Reduce bullet speed to 2px/frame if issues persist

**2. Random AI Gets Stuck (MEDIUM)**
- **Problem**: Enemy tanks might get stuck in corners or against walls
- **Mitigation**:
  - Change direction on wall collision
  - Periodic forced direction change (every 2-3 seconds)
  - Add small random offset to prevent perfect alignment
- **Contingency**: Add "unstuck" logic (if no movement for 2 seconds, teleport or force turn)

**3. Rendering Performance (LOW)**
- **Problem**: Too many entities slow down game
- **Mitigation**:
  - Limit to max 3 enemies
  - Max 1 bullet per tank (4 total bullets max)
  - Simple rectangle rendering (no images)
- **Contingency**: Reduce enemy count to 1 if FPS drops

---

## Technology Stack

**Recommended**: HTML5 + Vanilla JavaScript + Canvas

**Why**:
- ✅ Zero setup (no npm, no build tools)
- ✅ Runs in any browser
- ✅ Instant reload during development
- ✅ Perfect for small projects
- ✅ Easy to share (just send HTML file)

**Alternative** (if prefer typed language):
- TypeScript + Vite (adds 10 minutes setup time)
- Same Canvas API, adds type safety

**NOT Recommended for MVP**:
- ❌ Python + Pygame (harder to share/demo)
- ❌ Game engines (Phaser, Unity) - overkill for MVP
- ❌ Frameworks (React, Vue) - unnecessary complexity

---

## File-by-File Implementation Guide

### index.html
```html
<!DOCTYPE html>
<html>
<head>
  <title>Battle City MVP</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <canvas id="gameCanvas" width="512" height="448"></canvas>
  <script type="module" src="src/main.js"></script>
</body>
</html>
```

### styles.css
```css
body {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #222;
}
canvas {
  border: 2px solid #fff;
  background: #000;
}
```

### src/constants.js
- Export CANVAS_WIDTH, CANVAS_HEIGHT
- Export entity sizes (TANK_SIZE, BULLET_SIZE, WALL_SIZE)
- Export colors (PLAYER_COLOR, ENEMY_COLOR, etc.)
- Export speeds (PLAYER_SPEED, ENEMY_SPEED, BULLET_SPEED)
- Export directions enum (UP=0, RIGHT=1, DOWN=2, LEFT=3)

### src/input.js
- InputHandler class
- Constructor: add keydown/keyup listeners
- Track pressed keys in Map
- isKeyPressed(key) method

### src/renderer.js
- Renderer class
- Constructor: get canvas context
- clear() method
- drawRect(x, y, w, h, color) method
- drawText(text, x, y, color) method

### src/entities.js
- Tank class (player and enemy)
- Bullet class
- Wall class (brick and steel)
- Base class

### src/collision.js
- CollisionDetector class
- checkAABB(rect1, rect2) method
- All specific collision check methods

### src/main.js
- Initialize canvas, renderer, input handler
- Create entities (player, enemies, walls, base)
- Game loop with requestAnimationFrame
- Update logic (move entities, check collisions)
- Render logic (draw all entities)
- Game state management (playing, game over, win)

---

## Development Workflow

### Day 1 (2-3 hours): Setup + Rendering
- Phase 1 complete
- Checkpoint: Can render rectangles

### Day 2 (2-3 hours): Player Tank
- Phase 2 complete
- Checkpoint: Player can move and shoot

### Day 3 (2 hours): Enemy Tank
- Phase 3 complete
- Checkpoint: Enemy moves and shoots

### Day 4 (3-4 hours): Finish MVP
- Phase 4 complete
- Checkpoint: Fully playable game

**Total**: 9-12 hours over 4 days (or 1-2 days if working full-time)

---

## Success Criteria

**MVP is complete when**:
- [x] Game loads in browser without errors
- [x] Player can move tank (4 directions)
- [x] Player can shoot bullets
- [x] Enemy tanks move randomly
- [x] Enemy tanks shoot randomly
- [x] Bullets destroy tanks
- [x] Bullets destroy brick walls
- [x] Steel walls block bullets
- [x] Tanks can't move through walls
- [x] Base destruction triggers game over
- [x] Player death (0 lives) triggers game over
- [x] Enemy elimination triggers win
- [x] HUD shows lives and enemy count
- [x] Game runs at 60 FPS
- [x] Can restart with R key

---

## Next Steps

1. Create project folder: `battle-city-mvp/`
2. Start with Phase 1: Setup & Rendering
3. Work through phases sequentially
4. Test at each checkpoint
5. Once MVP complete, consider enhancements:
   - Better graphics (sprites instead of rectangles)
   - Sound effects
   - More enemy types
   - Power-ups
   - Multiple levels

---

**End of Implementation Plan**

**Ready to code**: Start with creating `index.html` and `styles.css`
