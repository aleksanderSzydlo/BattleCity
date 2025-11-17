# Feature Specification: Battle City MVP - Minimal Playable Prototype

**Feature Branch**: `main`  
**Created**: 2025-11-17  
**Status**: Draft  
**Input**: Minimal viable version of Battle City (Tank 1990) - playable browser game demonstrating core gameplay mechanics.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Core Gameplay (Priority: P1) 🎯 MVP

Player controls a tank that can move in 4 directions and shoot bullets to destroy enemy tanks while protecting the base.

**Why this priority**: This is the absolute minimum viable game. Without player movement, shooting, and basic enemy interaction, there is no game.

**Independent Test**: Load game in browser, player can move tank with arrow keys, shoot with spacebar, destroy enemy tank, game ends if base is destroyed or player dies.

**Acceptance Scenarios**:

1. **Given** game starts, **When** player presses arrow keys, **Then** tank moves in the corresponding direction
2. **Given** player tank is facing a direction, **When** player presses spacebar, **Then** bullet spawns and travels in that direction
3. **Given** player bullet hits enemy tank, **When** collision detected, **Then** enemy tank is destroyed
4. **Given** enemy bullet hits base, **When** collision detected, **Then** game ends with "Game Over" message
5. **Given** enemy bullet hits player, **When** collision detected, **Then** player loses a life (or dies if last life)
6. **Given** player destroys all enemies, **When** no enemies remain, **Then** "You Win" message displays

---

### Edge Cases

- What happens when player shoots while bullet already on screen? (Answer: max 1 bullet per tank)
- How does collision work at tile boundaries? (Answer: simple AABB collision, no sub-pixel)
- What happens when tank tries to move into wall? (Answer: movement blocked)
- What happens when two bullets collide? (Answer: both destroyed)

## Requirements *(mandatory)*

### Functional Requirements

**Game Initialization**
- **FR-001**: System MUST initialize HTML5 Canvas (512×448 pixels)
- **FR-002**: System MUST load single level with brick walls, steel walls, and base
- **FR-003**: System MUST spawn player tank at bottom center
- **FR-004**: System MUST spawn 1-3 enemy tanks at top of map

**Player Controls**
- **FR-005**: System MUST support arrow key input for movement (UP, DOWN, LEFT, RIGHT)
- **FR-006**: System MUST support spacebar for shooting
- **FR-007**: System MUST update tank facing direction based on last movement input
- **FR-008**: Player tank MUST move at consistent speed (2 pixels per frame)

**Enemy Behavior**
- **FR-009**: Enemy tanks MUST move randomly (change direction every 2-3 seconds)
- **FR-010**: Enemy tanks MUST shoot randomly (every 2-3 seconds)
- **FR-011**: Enemy tanks MUST move at slower speed than player (1 pixel per frame)

**Entities**
- **FR-012**: System MUST render player tank as colored rectangle (yellow, 16×16 pixels)
- **FR-013**: System MUST render enemy tanks as colored rectangles (red, 16×16 pixels)
- **FR-014**: System MUST render bullets as small rectangles (white, 4×4 pixels)
- **FR-015**: System MUST render brick walls as brown rectangles (8×8 pixels)
- **FR-016**: System MUST render steel walls as gray rectangles (8×8 pixels)
- **FR-017**: System MUST render base as special colored rectangle (green, 16×16 pixels)

**Collision Detection**
- **FR-018**: System MUST detect bullet-to-tank collisions (destroy tank)
- **FR-019**: System MUST detect bullet-to-wall collisions (destroy bullet, destroy brick wall)
- **FR-020**: System MUST detect tank-to-wall collisions (block movement)
- **FR-021**: System MUST detect bullet-to-bullet collisions (destroy both bullets)
- **FR-022**: Bullets MUST be destroyed when hitting steel walls (steel remains intact)

**Game State**
- **FR-023**: System MUST track player lives (start with 3 lives)
- **FR-024**: System MUST end game when player has 0 lives
- **FR-025**: System MUST end game when base is destroyed
- **FR-026**: System MUST display "Game Over" when player loses
- **FR-027**: System MUST display "You Win" when all enemies destroyed

**Rendering**
- **FR-028**: System MUST render at 60 FPS using requestAnimationFrame
- **FR-029**: System MUST clear canvas each frame before rendering
- **FR-030**: System MUST render entities in layers: walls → base → tanks → bullets
- **FR-031**: System MUST display HUD showing lives remaining and enemy count

### Key Entities

**Core Domain Entities**

- **Tank**: Represents player or enemy tank
  - Properties: x, y (position), width, height, direction (0-3 for up/right/down/left), type (player/enemy), speed, canShoot (cooldown flag)
  - Methods: move(), rotate(), shoot(), takeDamage()

- **Bullet**: Represents projectile
  - Properties: x, y, width, height, direction, speed, owner (player/enemy)
  - Methods: update(), destroy()

- **Wall**: Represents obstacle
  - Properties: x, y, width, height, type (brick/steel), destructible (boolean)
  - Methods: takeDamage(), destroy()

- **Base**: Represents eagle to protect
  - Properties: x, y, width, height, destroyed (boolean)
  - Methods: takeDamage()

- **Game**: Main game controller
  - Properties: canvas, context, entities (tanks, bullets, walls, base), gameState (playing/gameover/win), playerLives
  - Methods: init(), update(), render(), handleInput(), checkCollisions()

**System Components**

- **InputHandler**: Captures keyboard input
  - Properties: keys (object tracking pressed keys)
  - Methods: isKeyPressed(keyCode), update()

- **CollisionDetector**: Handles collision detection
  - Methods: checkAABB(rect1, rect2), checkBulletCollisions(), checkTankCollisions()

- **Renderer**: Draws to canvas
  - Methods: clear(), drawRect(x, y, w, h, color), drawEntity(entity)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Player can move tank in all 4 directions using arrow keys within 1 second of game start
- **SC-002**: Player can shoot bullets with spacebar with visible bullet traveling across screen
- **SC-003**: Bullet destroys enemy tank on collision (enemy disappears)
- **SC-004**: Bullet destroys brick wall on collision (brick disappears)
- **SC-005**: Bullet bounces off or is destroyed by steel wall (steel remains)
- **SC-006**: Game displays "Game Over" within 1 second of base destruction
- **SC-007**: Game maintains 60 FPS on modern browsers (2020+ laptops)
- **SC-008**: All collision detection works with 100% accuracy (no missed collisions)
- **SC-009**: Code is organized into at least 5 separate modules/files
- **SC-010**: Game is playable in browser with single HTML file entry point

## Technical Architecture

### Module Structure

```
battle-city-mvp/
├── index.html          # Entry point with canvas
├── styles.css          # Basic styling
├── src/
│   ├── main.js         # Game initialization and loop
│   ├── input.js        # InputHandler class
│   ├── entities.js     # Tank, Bullet, Wall, Base classes
│   ├── collision.js    # CollisionDetector class
│   ├── renderer.js     # Renderer class
│   └── constants.js    # Game constants (sizes, speeds, colors)
```

### Game Loop Flow

```
main.js: init()
  ├─> Create canvas
  ├─> Initialize entities (player, enemies, walls, base)
  ├─> Start game loop

main.js: gameLoop()
  ├─> InputHandler.update()
  ├─> Process player input (move, shoot)
  ├─> Update enemy AI (random movement, random shooting)
  ├─> Update bullets (move forward)
  ├─> CollisionDetector.checkAll()
  │     ├─> Bullet-Tank collisions → destroy tank
  │     ├─> Bullet-Wall collisions → destroy bullet/wall
  │     ├─> Tank-Wall collisions → block movement
  │     └─> Bullet-Base collision → game over
  ├─> Renderer.clear()
  ├─> Renderer.drawAll(entities)
  ├─> Check win/lose conditions
  └─> requestAnimationFrame(gameLoop)
```

### Data Structures

**Level Layout (hardcoded)**:
```javascript
const level = [
  "SSSSSSSSSSSSSSSS", // S = steel, B = brick, . = empty, E = base
  "S..............S",
  "S..BB....BB....S",
  "S..BB....BB....S",
  "S..............S",
  "S..BBB..BBB....S",
  "S..BBB..BBB....S",
  "S..............S",
  "S......E.......S", // E = base location
  "SSSSSSSSSSSSSSSS"
];
```

**Entity Structure**:
```javascript
{
  tank: {
    x: 256,        // pixel position
    y: 400,
    width: 16,
    height: 16,
    direction: 0,  // 0=up, 1=right, 2=down, 3=left
    type: 'player',
    speed: 2,
    lives: 3
  },
  bullet: {
    x: 264,
    y: 384,
    width: 4,
    height: 4,
    direction: 0,
    speed: 4,
    owner: 'player'
  }
}
```

## Implementation Plan

### Phase 1: Project Setup (30 minutes)
1. Create `index.html` with canvas element
2. Create `src/constants.js` with game constants
3. Create basic file structure

### Phase 2: Rendering (1 hour)
4. Implement `Renderer` class (clear, drawRect methods)
5. Test rendering colored rectangles on canvas
6. Implement HUD rendering (lives, enemy count)

### Phase 3: Input System (30 minutes)
7. Implement `InputHandler` class
8. Test arrow key and spacebar detection
9. Integrate with player tank rotation

### Phase 4: Entities (2 hours)
10. Implement `Tank` class (player and enemy)
11. Implement `Bullet` class
12. Implement `Wall` class (brick and steel)
13. Implement `Base` class
14. Test entity creation and basic rendering

### Phase 5: Collision Detection (2 hours)
15. Implement `CollisionDetector` with AABB collision
16. Implement bullet-tank collision
17. Implement bullet-wall collision
18. Implement tank-wall collision
19. Test all collision scenarios

### Phase 6: Game Loop (1 hour)
20. Implement main game loop in `main.js`
21. Integrate update logic (movement, shooting)
22. Integrate collision detection
23. Integrate rendering

### Phase 7: Enemy AI (1 hour)
24. Implement random movement for enemies
25. Implement random shooting for enemies
26. Test enemy behavior

### Phase 8: Win/Lose Conditions (30 minutes)
27. Implement game over logic (base destroyed, player dies)
28. Implement win logic (all enemies destroyed)
29. Display end game messages

### Phase 9: Testing & Polish (1 hour)
30. Playtest full game loop
31. Fix collision bugs
32. Adjust speeds and timings
33. Add basic CSS styling

**Total Estimated Time**: 8-10 hours for complete MVP

## Technology Stack

**Platform**: Web Browser  
**Languages**: HTML5, CSS3, Vanilla JavaScript (ES6)  
**Rendering**: HTML5 Canvas 2D API  
**No external libraries or frameworks**

**Browser Targets**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

## Constraints & Simplifications

**MVP Simplifications** (vs full Battle City):
- ❌ No power-ups
- ❌ No multiple levels
- ❌ No enemy variety (only one enemy type)
- ❌ No sprite sheets (colored rectangles only)
- ❌ No sound effects
- ❌ No advanced AI (pure random movement)
- ❌ No grid-based movement (continuous pixel movement)
- ❌ No score tracking
- ❌ No animations or effects
- ❌ Single bullet per tank at a time

**What IS included**:
- ✅ Player movement (4 directions)
- ✅ Player shooting
- ✅ Enemy tanks (move and shoot)
- ✅ Brick walls (destructible)
- ✅ Steel walls (indestructible)
- ✅ Base (must protect)
- ✅ Collision detection
- ✅ Lives system
- ✅ Win/lose conditions
- ✅ 60 FPS game loop

## Risks & Mitigations

**Risk 1**: Collision detection complexity
- *Mitigation*: Use simple AABB (axis-aligned bounding box), no pixel-perfect collision

**Risk 2**: 60 FPS performance
- *Mitigation*: Minimal entities (<10), simple rendering, no heavy computations

**Risk 3**: Random AI gets stuck
- *Mitigation*: Change direction on collision, periodic random direction change

**Risk 4**: Gameplay too easy/hard
- *Mitigation*: Adjustable constants for speed, enemy count, shoot frequency

## Acceptance Criteria

**Definition of Done**:
- [ ] Game loads in browser without errors
- [ ] Player can move tank with arrow keys
- [ ] Player can shoot with spacebar
- [ ] Bullets travel and collide correctly
- [ ] Enemy tanks move and shoot randomly
- [ ] Brick walls are destroyed by bullets
- [ ] Steel walls block bullets but aren't destroyed
- [ ] Base can be destroyed (triggers game over)
- [ ] Player has 3 lives, game over at 0 lives
- [ ] "Game Over" displays when player loses
- [ ] "You Win" displays when all enemies destroyed
- [ ] Game runs at stable 60 FPS
- [ ] Code is organized in separate modules
- [ ] No console errors during gameplay

---

**End of Specification**

**Next Step**: Proceed to `/plan` to create implementation roadmap.
