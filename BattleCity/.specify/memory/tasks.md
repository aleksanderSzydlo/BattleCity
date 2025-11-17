# Task Breakdown: Battle City MVP - Minimal Playable Prototype

**Branch**: `main` | **Date**: 2025-11-17 | **Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

## Task Summary

**Total Tasks**: 45  
**Estimated Total Time**: 9-12 hours  
**Modules**: 7 (Setup, Rendering, Player, Enemy, Collision, Map, Game State)  
**Dependencies**: Sequential phases (Setup → Rendering → Player → Enemy → Collision → Map → Game State)

---

## Module 1: Project Setup (3 tasks, 30 min)

### T001: Create project directory structure ✅ COMPLETED
**Objective**: Initialize project folder and file structure  
**Deliverable**: `battle-city-mvp/` folder with subdirectories  
**Acceptance Criteria**:
- [x] Created `battle-city-mvp/` root folder
- [x] Created `battle-city-mvp/src/` subfolder
- [x] Folder structure matches plan.md specification

**Difficulty**: Easy  
**Dependencies**: None  
**Estimated Time**: 5 min

---

### T002: Create index.html with canvas element ✅ COMPLETED
**Objective**: Set up HTML entry point with canvas  
**Deliverable**: `index.html` file  
**Acceptance Criteria**:
- [x] HTML file includes `<canvas id="gameCanvas" width="512" height="448">`
- [x] Canvas element exists in DOM
- [x] Script tag loads `src/main.js` as ES6 module
- [x] File opens in browser without errors

**Difficulty**: Easy  
**Dependencies**: T001  
**Estimated Time**: 10 min

---

### T003: Create styles.css for canvas centering ✅ COMPLETED
**Objective**: Style canvas to center on page  
**Deliverable**: `styles.css` file  
**Acceptance Criteria**:
- [x] Canvas centered horizontally and vertically
- [x] Canvas has visible border
- [x] Background is dark (for contrast)
- [x] No scrollbars appear

**Difficulty**: Easy  
**Dependencies**: T002  
**Estimated Time**: 15 min

---

## Module 2: Rendering System (5 tasks, 1-1.5 hours)

### T004: Create constants.js with canvas dimensions ✅ COMPLETED
**Objective**: Define game constants in centralized file  
**Deliverable**: `src/constants.js` file  
**Acceptance Criteria**:
- [x] Exported `CANVAS_WIDTH = 512`
- [x] Exported `CANVAS_HEIGHT = 448`
- [x] File can be imported by other modules
- [x] No syntax errors

**Difficulty**: Easy  
**Dependencies**: T001  
**Estimated Time**: 10 min

---

### T005: Add entity size constants ✅ COMPLETED
**Objective**: Define dimensions for all game entities  
**Deliverable**: Updated `src/constants.js`  
**Acceptance Criteria**:
- [x] `TANK_SIZE = 16`
- [x] `BULLET_SIZE = 4`
- [x] `WALL_SIZE = 8`
- [x] `BASE_SIZE = 16`
- [x] All constants exported

**Difficulty**: Easy  
**Dependencies**: T004  
**Estimated Time**: 5 min

---

### T006: Add color constants ✅ COMPLETED
**Objective**: Define colors for entities  
**Deliverable**: Updated `src/constants.js`  
**Acceptance Criteria**:
- [x] `PLAYER_COLOR = '#FFD700'` (yellow)
- [x] `ENEMY_COLOR = '#FF4444'` (red)
- [x] `BULLET_COLOR = '#FFFFFF'` (white)
- [x] `BRICK_COLOR = '#8B4513'` (brown)
- [x] `STEEL_COLOR = '#888888'` (gray)
- [x] `BASE_COLOR = '#00FF00'` (green)
- [x] `BG_COLOR = '#000000'` (black)

**Difficulty**: Easy  
**Dependencies**: T005  
**Estimated Time**: 5 min

---

### T007: Add speed and direction constants ✅ COMPLETED
**Objective**: Define movement speeds and direction enum  
**Deliverable**: Updated `src/constants.js`  
**Acceptance Criteria**:
- [x] `PLAYER_SPEED = 2`
- [x] `ENEMY_SPEED = 1`
- [x] `BULLET_SPEED = 4`
- [x] `DIRECTION = { UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3 }`
- [x] All constants exported

**Difficulty**: Easy  
**Dependencies**: T006  
**Estimated Time**: 5 min

---

### T008: Create Renderer class with basic methods ✅ COMPLETED
**Objective**: Implement canvas rendering utilities  
**Deliverable**: `src/renderer.js` file  
**Acceptance Criteria**:
- [x] Class constructor accepts canvas element
- [x] `clear()` method clears entire canvas
- [x] `drawRect(x, y, w, h, color)` draws filled rectangle
- [x] `drawText(text, x, y, color)` draws text
- [x] Methods work when called from main.js
- [x] No rendering artifacts

**Difficulty**: Easy  
**Dependencies**: T004  
**Estimated Time**: 20 min

---

### T009: Create basic game loop in main.js
**Objective**: Initialize canvas and start game loop  
**Deliverable**: `src/main.js` file  
**Acceptance Criteria**:
- [ ] Canvas reference obtained via `document.getElementById()`
- [ ] Renderer initialized with canvas
- [ ] `gameLoop()` function using `requestAnimationFrame()`
- [ ] Loop calls `renderer.clear()` each frame
- [ ] Loop draws test rectangle to verify rendering
- [ ] Game runs at ~60 FPS (verify with console.log)

**Difficulty**: Easy  
**Dependencies**: T008  
**Estimated Time**: 25 min

---

## Module 3: Input System (2 tasks, 30 min)

### T010: Create InputHandler class
**Objective**: Implement keyboard input tracking  
**Deliverable**: `src/input.js` file  
**Acceptance Criteria**:
- [ ] Constructor adds event listeners for `keydown` and `keyup`
- [ ] Internal Map/object tracks pressed keys
- [ ] `isKeyPressed(key)` returns boolean
- [ ] Tracks arrow keys: `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`
- [ ] Tracks spacebar: `Space`
- [ ] No memory leaks (listeners properly attached)

**Difficulty**: Easy  
**Dependencies**: None  
**Estimated Time**: 20 min

---

### T011: Integrate InputHandler into main.js
**Objective**: Connect input system to game loop  
**Deliverable**: Updated `src/main.js`  
**Acceptance Criteria**:
- [ ] InputHandler instantiated at game start
- [ ] Can check key states in game loop
- [ ] Console.log verifies keys are detected
- [ ] No errors when pressing keys

**Difficulty**: Easy  
**Dependencies**: T010, T009  
**Estimated Time**: 10 min

---

## Module 4: Player Tank (8 tasks, 2-2.5 hours)

### T012: Create Tank class skeleton
**Objective**: Define Tank entity structure  
**Deliverable**: `src/entities.js` file with Tank class  
**Acceptance Criteria**:
- [ ] Class constructor accepts: x, y, type (player/enemy)
- [ ] Properties: x, y, width, height, direction, speed, type
- [ ] Constructor sets width/height from constants
- [ ] Constructor sets speed based on type
- [ ] Direction defaults to UP
- [ ] No methods implemented yet (stubs OK)

**Difficulty**: Easy  
**Dependencies**: T007  
**Estimated Time**: 15 min

---

### T013: Implement Tank.move() method
**Objective**: Enable tank movement  
**Deliverable**: Updated Tank class  
**Acceptance Criteria**:
- [ ] `move(dx, dy)` updates x and y position
- [ ] Movement respects tank speed
- [ ] Method is callable
- [ ] Tank position changes when method called

**Difficulty**: Easy  
**Dependencies**: T012  
**Estimated Time**: 10 min

---

### T014: Implement Tank.rotate() method
**Objective**: Enable tank rotation  
**Deliverable**: Updated Tank class  
**Acceptance Criteria**:
- [ ] `rotate(newDirection)` updates direction property
- [ ] Accepts DIRECTION enum values (0-3)
- [ ] Direction changes when method called

**Difficulty**: Easy  
**Dependencies**: T013  
**Estimated Time**: 5 min

---

### T015: Add shooting cooldown to Tank
**Objective**: Prevent bullet spam  
**Deliverable**: Updated Tank class  
**Acceptance Criteria**:
- [ ] Property `canShoot` initialized to `true`
- [ ] Property `shootCooldown` timer initialized to 0
- [ ] `updateCooldown()` method decrements timer
- [ ] Cooldown resets to 30 frames (~0.5s) after shooting
- [ ] Tank can only shoot when `canShoot === true`

**Difficulty**: Medium  
**Dependencies**: T014  
**Estimated Time**: 20 min

---

### T016: Create Bullet class
**Objective**: Define Bullet entity  
**Deliverable**: Updated `src/entities.js` with Bullet class  
**Acceptance Criteria**:
- [ ] Constructor accepts: x, y, direction, owner (player/enemy)
- [ ] Properties: x, y, width, height, direction, speed, owner
- [ ] Width and height set from constants
- [ ] Speed set from BULLET_SPEED constant
- [ ] `update()` method moves bullet forward based on direction
- [ ] `isOffScreen()` method returns true if outside canvas bounds

**Difficulty**: Easy  
**Dependencies**: T007  
**Estimated Time**: 20 min

---

### T017: Implement Tank.shoot() method
**Objective**: Enable tank to create bullets  
**Deliverable**: Updated Tank class  
**Acceptance Criteria**:
- [ ] `shoot()` method returns new Bullet instance
- [ ] Bullet spawns at tank position (offset to front)
- [ ] Bullet travels in tank's facing direction
- [ ] Method returns `null` if cooldown active
- [ ] Cooldown activates after shooting
- [ ] Can shoot in all 4 directions correctly

**Difficulty**: Medium  
**Dependencies**: T016, T015  
**Estimated Time**: 25 min

---

### T018: Add player tank to game
**Objective**: Instantiate and render player tank  
**Deliverable**: Updated `src/main.js`  
**Acceptance Criteria**:
- [ ] Player tank created at bottom center (x: 248, y: 400)
- [ ] Tank type set to 'player'
- [ ] Tank rendered as yellow rectangle
- [ ] Tank visible on canvas
- [ ] No errors in console

**Difficulty**: Easy  
**Dependencies**: T017, T009  
**Estimated Time**: 15 min

---

### T019: Implement player tank controls
**Objective**: Connect keyboard input to tank movement  
**Deliverable**: Updated `src/main.js`  
**Acceptance Criteria**:
- [ ] Arrow Up → tank moves up, rotates to UP
- [ ] Arrow Down → tank moves down, rotates to DOWN
- [ ] Arrow Left → tank moves left, rotates to LEFT
- [ ] Arrow Right → tank moves right, rotates to RIGHT
- [ ] Spacebar → tank shoots bullet
- [ ] Tank movement is smooth
- [ ] Tank rotation is immediate
- [ ] Bullets spawn and travel correctly
- [ ] Array stores active bullets
- [ ] Bullets update and render each frame

**Difficulty**: Medium  
**Dependencies**: T018, T011  
**Estimated Time**: 30 min

---

### T020: Add boundary collision for player
**Objective**: Prevent player from leaving screen  
**Deliverable**: Updated `src/main.js`  
**Acceptance Criteria**:
- [ ] Player cannot move above y=0
- [ ] Player cannot move below y=CANVAS_HEIGHT-TANK_SIZE
- [ ] Player cannot move left of x=0
- [ ] Player cannot move right of x=CANVAS_WIDTH-TANK_SIZE
- [ ] Tank stops at edges (no wrapping)
- [ ] Movement in other directions still works at edges

**Difficulty**: Easy  
**Dependencies**: T019  
**Estimated Time**: 15 min

---

## Module 5: Enemy Tank & AI (6 tasks, 1.5-2 hours)

### T021: Create enemy tank instance
**Objective**: Spawn enemy tank on screen  
**Deliverable**: Updated `src/main.js`  
**Acceptance Criteria**:
- [ ] Enemy tank created at top center (x: 248, y: 32)
- [ ] Tank type set to 'enemy'
- [ ] Tank rendered as red rectangle
- [ ] Tank visible on canvas
- [ ] Enemy stored in array (support multiple)

**Difficulty**: Easy  
**Dependencies**: T012  
**Estimated Time**: 10 min

---

### T022: Implement random direction change AI
**Objective**: Enemy changes direction periodically  
**Deliverable**: Updated `src/main.js`  
**Acceptance Criteria**:
- [ ] Enemy has timer for direction change (default: 120 frames = 2s)
- [ ] Timer decrements each frame
- [ ] When timer reaches 0, enemy picks random direction (0-3)
- [ ] Timer resets to random value (60-180 frames)
- [ ] Enemy tank rotates to new direction
- [ ] Direction changes are visually noticeable

**Difficulty**: Medium  
**Dependencies**: T021  
**Estimated Time**: 25 min

---

### T023: Implement enemy movement in game loop
**Objective**: Enemy tanks move automatically  
**Deliverable**: Updated `src/main.js`  
**Acceptance Criteria**:
- [ ] Enemy moves forward in facing direction each frame
- [ ] Movement speed is ENEMY_SPEED (slower than player)
- [ ] Multiple enemies can move independently
- [ ] Movement is smooth and consistent

**Difficulty**: Easy  
**Dependencies**: T022  
**Estimated Time**: 15 min

---

### T024: Add boundary collision for enemies
**Objective**: Enemies bounce off screen edges  
**Deliverable**: Updated `src/main.js`  
**Acceptance Criteria**:
- [ ] Enemy cannot move off screen (same bounds as player)
- [ ] When hitting edge, enemy picks new random direction
- [ ] Enemy doesn't get stuck at edges
- [ ] Works for all 4 screen edges

**Difficulty**: Medium  
**Dependencies**: T023  
**Estimated Time**: 20 min

---

### T025: Implement random shooting AI
**Objective**: Enemy shoots bullets periodically  
**Deliverable**: Updated `src/main.js`  
**Acceptance Criteria**:
- [ ] Enemy has timer for shooting (default: 120 frames = 2s)
- [ ] Timer decrements each frame
- [ ] When timer reaches 0, enemy shoots bullet
- [ ] Timer resets to random value (90-180 frames)
- [ ] Bullet respects shooting cooldown
- [ ] Enemy bullets stored in separate array (or same with owner tag)
- [ ] Bullets render and move correctly

**Difficulty**: Medium  
**Dependencies**: T024, T017  
**Estimated Time**: 25 min

---

### T026: Test with multiple enemies
**Objective**: Verify 1-3 enemies work simultaneously  
**Deliverable**: Updated `src/main.js`  
**Acceptance Criteria**:
- [ ] Can spawn 1, 2, or 3 enemies
- [ ] Each enemy has independent AI timers
- [ ] Enemies don't interfere with each other
- [ ] All enemies move and shoot independently
- [ ] No performance issues with 3 enemies

**Difficulty**: Easy  
**Dependencies**: T025  
**Estimated Time**: 15 min

---

## Module 6: Collision Detection (8 tasks, 2-2.5 hours)

### T027: Create CollisionDetector class skeleton
**Objective**: Set up collision detection utilities  
**Deliverable**: `src/collision.js` file  
**Acceptance Criteria**:
- [ ] Class created with constructor
- [ ] No instance variables needed (static methods OK)
- [ ] File can be imported
- [ ] No syntax errors

**Difficulty**: Easy  
**Dependencies**: None  
**Estimated Time**: 5 min

---

### T028: Implement AABB collision detection
**Objective**: Create axis-aligned bounding box collision check  
**Deliverable**: Updated CollisionDetector class  
**Acceptance Criteria**:
- [ ] `checkAABB(rect1, rect2)` method accepts two objects with x, y, width, height
- [ ] Returns `true` if rectangles overlap
- [ ] Returns `false` if rectangles don't overlap
- [ ] Works for all overlap scenarios (corners, edges, full containment)
- [ ] Algorithm is correct: `r1.x < r2.x + r2.w && r1.x + r1.w > r2.x && r1.y < r2.y + r2.h && r1.y + r1.h > r2.y`

**Difficulty**: Medium  
**Dependencies**: T027  
**Estimated Time**: 20 min

---

### T029: Implement bullet-tank collision
**Objective**: Detect when bullets hit tanks  
**Deliverable**: Updated CollisionDetector class  
**Acceptance Criteria**:
- [ ] `checkBulletTankCollision(bullets, tanks)` method
- [ ] Returns array of collision pairs: `[{bullet, tank}]`
- [ ] Only detects collisions between bullets and enemy tanks (owner check)
- [ ] Works for player bullets hitting enemy tanks
- [ ] Works for enemy bullets hitting player tank
- [ ] Uses AABB collision check

**Difficulty**: Medium  
**Dependencies**: T028  
**Estimated Time**: 25 min

---

### T030: Implement bullet-wall collision
**Objective**: Detect bullets hitting walls  
**Deliverable**: Updated CollisionDetector class  
**Acceptance Criteria**:
- [ ] `checkBulletWallCollision(bullets, walls)` method
- [ ] Returns array of collision pairs: `[{bullet, wall}]`
- [ ] Detects all bullet-wall collisions
- [ ] Uses AABB collision check
- [ ] Works for brick and steel walls

**Difficulty**: Easy  
**Dependencies**: T028  
**Estimated Time**: 15 min

---

### T031: Implement tank-wall collision
**Objective**: Detect tanks colliding with walls  
**Deliverable**: Updated CollisionDetector class  
**Acceptance Criteria**:
- [ ] `checkTankWallCollision(tank, walls)` method
- [ ] Returns `true` if tank overlaps any wall
- [ ] Returns `false` if no collision
- [ ] Uses AABB collision check
- [ ] Checks against all walls in array

**Difficulty**: Easy  
**Dependencies**: T028  
**Estimated Time**: 15 min

---

### T032: Implement bullet-bullet collision
**Objective**: Detect bullets colliding with each other  
**Deliverable**: Updated CollisionDetector class  
**Acceptance Criteria**:
- [ ] `checkBulletBulletCollision(bullets)` method
- [ ] Returns array of collision pairs: `[{bullet1, bullet2}]`
- [ ] Checks all bullets against each other (avoid double-checking)
- [ ] Uses AABB collision check
- [ ] Works for player vs enemy bullets

**Difficulty**: Medium  
**Dependencies**: T028  
**Estimated Time**: 20 min

---

### T033: Integrate collision detection into game loop
**Objective**: Check collisions every frame  
**Deliverable**: Updated `src/main.js`  
**Acceptance Criteria**:
- [ ] CollisionDetector imported
- [ ] All collision checks run each frame
- [ ] Collision results stored for processing
- [ ] No errors when collisions occur

**Difficulty**: Easy  
**Dependencies**: T032, T009  
**Estimated Time**: 15 min

---

### T034: Handle bullet-tank collision results
**Objective**: Destroy tanks when hit by bullets  
**Deliverable**: Updated `src/main.js`  
**Acceptance Criteria**:
- [ ] When player bullet hits enemy, remove enemy from array
- [ ] When enemy bullet hits player, decrement player lives
- [ ] Remove bullets after collision
- [ ] Tanks disappear from screen after destruction
- [ ] Bullets disappear from screen after collision
- [ ] No null reference errors

**Difficulty**: Medium  
**Dependencies**: T033  
**Estimated Time**: 25 min

---

### T035: Handle bullet-wall and tank-wall collisions
**Objective**: Bullets destroy brick walls, tanks can't pass walls  
**Deliverable**: Updated `src/main.js`  
**Acceptance Criteria**:
- [ ] Bullet hitting brick wall → remove bullet and wall
- [ ] Bullet hitting steel wall → remove bullet only
- [ ] Tank hitting wall → prevent movement (revert position)
- [ ] Bullet-bullet collision → remove both bullets
- [ ] All collision behaviors work correctly
- [ ] No rendering artifacts

**Difficulty**: Medium  
**Dependencies**: T034  
**Estimated Time**: 30 min

---

## Module 7: Map & Walls (4 tasks, 1-1.5 hours)

### T036: Create Wall class
**Objective**: Define Wall entity  
**Deliverable**: Updated `src/entities.js`  
**Acceptance Criteria**:
- [ ] Constructor accepts: x, y, type ('brick' or 'steel')
- [ ] Properties: x, y, width, height, type, destructible
- [ ] Width and height set from WALL_SIZE constant
- [ ] Brick walls have `destructible = true`
- [ ] Steel walls have `destructible = false`
- [ ] `takeDamage()` method marks wall for removal if destructible

**Difficulty**: Easy  
**Dependencies**: T007  
**Estimated Time**: 15 min

---

### T037: Create Base class
**Objective**: Define Base entity  
**Deliverable**: Updated `src/entities.js`  
**Acceptance Criteria**:
- [ ] Constructor accepts: x, y
- [ ] Properties: x, y, width, height, destroyed
- [ ] Width and height set from BASE_SIZE constant
- [ ] `destroyed` initialized to `false`
- [ ] `takeDamage()` method sets `destroyed = true`

**Difficulty**: Easy  
**Dependencies**: T007  
**Estimated Time**: 10 min

---

### T038: Create hardcoded level layout
**Objective**: Define wall positions for single level  
**Deliverable**: Updated `src/main.js`  
**Acceptance Criteria**:
- [ ] Array defines wall positions and types
- [ ] Layout includes brick walls around perimeter
- [ ] Layout includes some steel walls for variety
- [ ] Layout leaves space for player and enemy movement
- [ ] Base positioned at bottom center (x: 248, y: 416)
- [ ] Walls instantiated from layout data
- [ ] Walls stored in array

**Difficulty**: Medium  
**Dependencies**: T036, T037  
**Estimated Time**: 30 min

---

### T039: Render walls and base
**Objective**: Draw map elements on canvas  
**Deliverable**: Updated `src/main.js`  
**Acceptance Criteria**:
- [ ] All brick walls render as brown rectangles
- [ ] All steel walls render as gray rectangles
- [ ] Base renders as green rectangle
- [ ] Walls render in correct positions
- [ ] Render order: walls first, then tanks/bullets on top
- [ ] No visual glitches

**Difficulty**: Easy  
**Dependencies**: T038  
**Estimated Time**: 15 min

---

## Module 8: Game State & UI (9 tasks, 1.5-2 hours)

### T040: Add player lives tracking
**Objective**: Track player health  
**Deliverable**: Updated `src/main.js`  
**Acceptance Criteria**:
- [ ] Variable `playerLives` initialized to 3
- [ ] Lives decrement when player hit by bullet
- [ ] Lives cannot go below 0
- [ ] Lives value accessible for rendering

**Difficulty**: Easy  
**Dependencies**: T034  
**Estimated Time**: 10 min

---

### T041: Implement game state enum
**Objective**: Track game state (playing, game over, win)  
**Deliverable**: Updated `src/main.js`  
**Acceptance Criteria**:
- [ ] Variable `gameState` with values: 'PLAYING', 'GAME_OVER', 'WIN'
- [ ] Initial state is 'PLAYING'
- [ ] State changes based on game conditions
- [ ] Game loop respects current state

**Difficulty**: Easy  
**Dependencies**: None  
**Estimated Time**: 10 min

---

### T042: Implement game over condition (player death)
**Objective**: End game when player runs out of lives  
**Deliverable**: Updated `src/main.js`  
**Acceptance Criteria**:
- [ ] Check if `playerLives === 0` each frame
- [ ] Set `gameState = 'GAME_OVER'` when condition met
- [ ] Game loop stops updating entities when game over
- [ ] Condition checked after collision processing

**Difficulty**: Easy  
**Dependencies**: T040, T041  
**Estimated Time**: 10 min

---

### T043: Implement game over condition (base destroyed)
**Objective**: End game when base is destroyed  
**Deliverable**: Updated `src/main.js`  
**Acceptance Criteria**:
- [ ] Add bullet-base collision detection
- [ ] When bullet hits base, call `base.takeDamage()`
- [ ] Check if `base.destroyed === true` each frame
- [ ] Set `gameState = 'GAME_OVER'` when base destroyed
- [ ] Game loop stops updating entities when game over

**Difficulty**: Medium  
**Dependencies**: T037, T041  
**Estimated Time**: 20 min

---

### T044: Implement win condition
**Objective**: End game when all enemies destroyed  
**Deliverable**: Updated `src/main.js`  
**Acceptance Criteria**:
- [ ] Check if `enemies.length === 0` each frame
- [ ] Set `gameState = 'WIN'` when no enemies remain
- [ ] Game loop stops updating entities when won
- [ ] Condition checked after collision processing

**Difficulty**: Easy  
**Dependencies**: T041  
**Estimated Time**: 10 min

---

### T045: Render HUD (lives and enemy count)
**Objective**: Display game information  
**Deliverable**: Updated `src/main.js`  
**Acceptance Criteria**:
- [ ] Display "Lives: X" at top-left corner (x: 10, y: 20)
- [ ] Display "Enemies: X" at top-right corner (x: 450, y: 20)
- [ ] Text is white and readable
- [ ] HUD updates each frame
- [ ] HUD visible during gameplay

**Difficulty**: Easy  
**Dependencies**: T040  
**Estimated Time**: 15 min

---

### T046: Render game over message
**Objective**: Display "GAME OVER" when player loses  
**Deliverable**: Updated `src/main.js`  
**Acceptance Criteria**:
- [ ] When `gameState === 'GAME_OVER'`, display "GAME OVER" in center
- [ ] Text is large (font size 48px)
- [ ] Text is white and centered on canvas
- [ ] Text only appears when game over
- [ ] Background entities still visible

**Difficulty**: Easy  
**Dependencies**: T042, T043  
**Estimated Time**: 15 min

---

### T047: Render win message
**Objective**: Display "YOU WIN" when player wins  
**Deliverable**: Updated `src/main.js`  
**Acceptance Criteria**:
- [ ] When `gameState === 'WIN'`, display "YOU WIN!" in center
- [ ] Text is large (font size 48px)
- [ ] Text is white and centered on canvas
- [ ] Text only appears when won
- [ ] Background entities still visible

**Difficulty**: Easy  
**Dependencies**: T044  
**Estimated Time**: 10 min

---

### T048: Implement restart functionality
**Objective**: Allow player to restart after game ends  
**Deliverable**: Updated `src/main.js`  
**Acceptance Criteria**:
- [ ] Listen for 'R' key press
- [ ] Reset all game state: lives, enemies, bullets, walls, base
- [ ] Reset player tank position
- [ ] Respawn enemies
- [ ] Set `gameState = 'PLAYING'`
- [ ] Game restarts correctly
- [ ] Display "Press R to restart" message on game over/win screens

**Difficulty**: Medium  
**Dependencies**: T046, T047  
**Estimated Time**: 25 min

---

## Task Dependency Graph

```
T001 (Setup folder)
  ├─→ T002 (index.html)
  │     └─→ T003 (styles.css)
  └─→ T004 (constants.js)
        ├─→ T005 (entity sizes)
        │     └─→ T006 (colors)
        │           └─→ T007 (speeds)
        │                 ├─→ T008 (Renderer)
        │                 │     └─→ T009 (game loop)
        │                 │           ├─→ T011 (integrate input)
        │                 │           ├─→ T018 (add player)
        │                 │           ├─→ T021 (add enemy)
        │                 │           ├─→ T033 (integrate collision)
        │                 │           └─→ T038 (level layout)
        │                 ├─→ T012 (Tank class)
        │                 │     ├─→ T013 (move)
        │                 │     │     └─→ T014 (rotate)
        │                 │     │           └─→ T015 (cooldown)
        │                 │     │                 └─→ T017 (shoot)
        │                 │     └─→ T021 (enemy tank)
        │                 ├─→ T016 (Bullet class)
        │                 │     └─→ T017 (shoot method)
        │                 ├─→ T036 (Wall class)
        │                 │     └─→ T038 (level layout)
        │                 └─→ T037 (Base class)
        │                       └─→ T038 (level layout)

T010 (InputHandler)
  └─→ T011 (integrate input)
        └─→ T019 (player controls)
              └─→ T020 (boundary)

T027 (CollisionDetector)
  └─→ T028 (AABB)
        ├─→ T029 (bullet-tank)
        ├─→ T030 (bullet-wall)
        ├─→ T031 (tank-wall)
        └─→ T032 (bullet-bullet)
              └─→ T033 (integrate)
                    ├─→ T034 (handle bullet-tank)
                    │     ├─→ T040 (lives tracking)
                    │     └─→ T043 (base collision)
                    └─→ T035 (handle bullet-wall)

T041 (game state enum)
  ├─→ T042 (game over - player)
  ├─→ T043 (game over - base)
  └─→ T044 (win condition)
        ├─→ T046 (game over message)
        ├─→ T047 (win message)
        └─→ T048 (restart)

T045 (HUD) - parallel to game state tasks
```

---

## Module Summary

| Module | Tasks | Est. Time | Critical Path |
|--------|-------|-----------|---------------|
| Setup | 3 | 30 min | Yes |
| Rendering | 6 | 1-1.5 hrs | Yes |
| Input | 2 | 30 min | Yes |
| Player | 9 | 2-2.5 hrs | Yes |
| Enemy | 6 | 1.5-2 hrs | Yes |
| Collision | 9 | 2-2.5 hrs | Yes |
| Map | 4 | 1-1.5 hrs | Yes |
| Game State | 9 | 1.5-2 hrs | Yes |
| **TOTAL** | **48** | **11-14 hrs** | - |

---

## Testing Checklist by Module

### Setup (T001-T003)
- [ ] Folder structure created
- [ ] index.html opens in browser
- [ ] Canvas visible with border
- [ ] No console errors

### Rendering (T004-T009)
- [ ] Constants file exports correctly
- [ ] Renderer draws rectangles
- [ ] Game loop runs at 60 FPS
- [ ] Canvas clears each frame

### Input (T010-T011)
- [ ] Arrow keys detected
- [ ] Spacebar detected
- [ ] Key states tracked correctly

### Player (T012-T020)
- [ ] Player tank renders
- [ ] Arrow keys move tank
- [ ] Tank rotates correctly
- [ ] Spacebar shoots bullet
- [ ] Bullet travels across screen
- [ ] Can't shoot during cooldown
- [ ] Tank can't leave screen

### Enemy (T021-T026)
- [ ] Enemy tank renders
- [ ] Enemy moves randomly
- [ ] Enemy changes direction periodically
- [ ] Enemy shoots randomly
- [ ] Multiple enemies work independently
- [ ] Enemies don't leave screen

### Collision (T027-T035)
- [ ] AABB collision works
- [ ] Player bullet destroys enemy
- [ ] Enemy bullet damages player
- [ ] Bullets destroy brick walls
- [ ] Bullets bounce off steel walls
- [ ] Tanks can't pass through walls
- [ ] Bullets destroy each other

### Map (T036-T039)
- [ ] Brick walls render
- [ ] Steel walls render
- [ ] Base renders
- [ ] Walls in correct positions
- [ ] Layout makes sense

### Game State (T040-T048)
- [ ] Lives displayed
- [ ] Enemy count displayed
- [ ] Player death triggers game over
- [ ] Base destruction triggers game over
- [ ] All enemies dead triggers win
- [ ] "GAME OVER" displays correctly
- [ ] "YOU WIN" displays correctly
- [ ] R key restarts game

---

## Critical Path Tasks (Must Complete in Order)

1. **T001-T009**: Foundation (Setup + Rendering) - *2 hours*
2. **T010-T020**: Player System (Input + Player) - *3 hours*
3. **T021-T026**: Enemy System - *2 hours*
4. **T027-T035**: Collision System - *2.5 hours*
5. **T036-T039**: Map System - *1.5 hours*
6. **T040-T048**: Game State System - *2 hours*

**Total Critical Path**: ~13 hours

---

## Parallel Work Opportunities

Tasks that can be done in parallel (no dependencies):

- T010 (InputHandler) while doing T004-T008 (constants + renderer)
- T027 (CollisionDetector skeleton) while doing T012-T020 (Player)
- T036-T037 (Wall/Base classes) while doing T021-T026 (Enemy)
- T045 (HUD) anytime after T040 (lives tracking)

---

## Risk Mitigation Tasks

**High Priority Validation**:
- T028: AABB collision (test thoroughly with edge cases)
- T035: Bullet-wall collision (test brick vs steel behavior)
- T043: Base collision (critical for game over)
- T048: Restart logic (must reset everything correctly)

**Testing After Each Module**:
- After T009: Verify rendering works
- After T020: Verify player controls work
- After T026: Verify enemy AI works
- After T035: Verify all collisions work
- After T039: Verify map renders correctly
- After T048: Verify full game loop works

---

## Definition of Done (Per Task)

A task is complete when:
1. Code is written and file saved
2. No syntax errors in console
3. Acceptance criteria all met
4. Feature works in browser
5. No regressions (previous features still work)
6. Code is readable (comments for complex logic)

---

## Quick Start Guide

**Day 1 (4 hours)**: T001-T020 (Setup + Rendering + Input + Player)  
**Day 2 (4 hours)**: T021-T035 (Enemy + Collision)  
**Day 3 (3 hours)**: T036-T048 (Map + Game State)  

**Result**: Fully playable Battle City MVP in 3 days! 🎮

---

**End of Task Breakdown**

**Next Step**: Start with T001 - Create project directory structure
