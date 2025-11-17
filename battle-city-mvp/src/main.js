import { Renderer } from './renderer.js';
import { InputHandler } from './input.js';
import { Tank, Wall, Base } from './entities.js';
import { CollisionDetector } from './collision.js';
import { DIRECTION, PLAYER_COLOR, ENEMY_COLOR, BULLET_COLOR, BRICK_COLOR, STEEL_COLOR, BASE_COLOR, CANVAS_WIDTH, CANVAS_HEIGHT, TANK_SIZE } from './constants.js';

// Get canvas element
const canvas = document.getElementById('gameCanvas');
const renderer = new Renderer(canvas);
const input = new InputHandler();

// Game entities
const player = new Tank(CANVAS_WIDTH / 2 - TANK_SIZE / 2, CANVAS_HEIGHT - TANK_SIZE - 32, 'player');
const enemies = [];
const bullets = [];
const walls = [];
let base = null;

// Game state
let playerLives = 3;
let gameState = 'PLAYING'; // PLAYING, GAME_OVER, WIN

// Game state
let lastTime = 0;
let fps = 0;
let frameCount = 0;
let fpsTime = 0;

// Initialize level
function initLevel() {
  // Create walls around perimeter
  const wallSize = 8;
  
  // Top wall
  for (let x = 0; x < CANVAS_WIDTH; x += wallSize) {
    walls.push(new Wall(x, 0, 'steel'));
  }
  
  // Bottom wall
  for (let x = 0; x < CANVAS_WIDTH; x += wallSize) {
    walls.push(new Wall(x, CANVAS_HEIGHT - wallSize, 'steel'));
  }
  
  // Left wall
  for (let y = wallSize; y < CANVAS_HEIGHT - wallSize; y += wallSize) {
    walls.push(new Wall(0, y, 'steel'));
  }
  
  // Right wall
  for (let y = wallSize; y < CANVAS_HEIGHT - wallSize; y += wallSize) {
    walls.push(new Wall(CANVAS_WIDTH - wallSize, y, 'steel'));
  }
  
  // Add some brick walls in middle
  for (let x = 100; x < 200; x += wallSize) {
    walls.push(new Wall(x, 200, 'brick'));
  }
  
  for (let x = 300; x < 400; x += wallSize) {
    walls.push(new Wall(x, 300, 'brick'));
  }
  
  // Walls around base
  const baseX = CANVAS_WIDTH / 2 - TANK_SIZE / 2;
  const baseY = CANVAS_HEIGHT - TANK_SIZE - 16;
  
  // Create base
  base = new Base(baseX, baseY);
  
  // Brick walls around base for protection
  for (let x = baseX - wallSize * 3; x < baseX + TANK_SIZE + wallSize * 3; x += wallSize) {
    walls.push(new Wall(x, baseY - wallSize, 'brick'));
  }
}

initLevel();

// Initialize enemies
function initEnemies() {
  const enemyCount = 3;
  for (let i = 0; i < enemyCount; i++) {
    const x = 50 + i * 200;
    const enemy = new Tank(x, 32, 'enemy');
    enemy.aiDirectionTimer = Math.random() * 60 + 60; // Random 1-2 seconds
    enemy.aiShootTimer = Math.random() * 60 + 90; // Random 1.5-2.5 seconds
    enemies.push(enemy);
  }
}

initEnemies();

// Game loop
function gameLoop(currentTime) {
  // Calculate delta time
  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  // Calculate FPS
  frameCount++;
  fpsTime += deltaTime;
  if (fpsTime >= 1000) {
    fps = frameCount;
    frameCount = 0;
    fpsTime = 0;
  }

  // Clear canvas
  renderer.clear();

  if (gameState === 'PLAYING') {
    // Update player
    updatePlayer();
    
    // Update enemies
    updateEnemies();
    
    // Update bullets
    updateBullets();
    
    // Check collisions
    checkCollisions();
    
    // Check win/lose conditions
    checkGameState();
  }

  // Render
  renderGame();
  
  // Display FPS and HUD
  renderer.drawText(`FPS: ${fps}`, 10, 20, '#FFFFFF', 14);
  renderer.drawText(`Lives: ${playerLives}`, 10, 40, '#FFFFFF', 16);
  renderer.drawText(`Enemies: ${enemies.length}`, CANVAS_WIDTH - 120, 40, '#FFFFFF', 16);

  // Game over/win messages
  if (gameState === 'GAME_OVER') {
    renderer.drawTextCentered('GAME OVER', CANVAS_HEIGHT / 2, '#FF0000', 48);
    renderer.drawTextCentered('Press R to Restart', CANVAS_HEIGHT / 2 + 60, '#FFFFFF', 24);
  } else if (gameState === 'WIN') {
    renderer.drawTextCentered('YOU WIN!', CANVAS_HEIGHT / 2, '#00FF00', 48);
    renderer.drawTextCentered('Press R to Restart', CANVAS_HEIGHT / 2 + 60, '#FFFFFF', 24);
  }

  // Continue loop
  requestAnimationFrame(gameLoop);
}

function updatePlayer() {
  // Store old position for boundary check
  const oldX = player.x;
  const oldY = player.y;

  // Handle movement and rotation
  if (input.isKeyPressed('ArrowUp')) {
    player.rotate(DIRECTION.UP);
    player.move(0, -1);
  } else if (input.isKeyPressed('ArrowDown')) {
    player.rotate(DIRECTION.DOWN);
    player.move(0, 1);
  } else if (input.isKeyPressed('ArrowLeft')) {
    player.rotate(DIRECTION.LEFT);
    player.move(-1, 0);
  } else if (input.isKeyPressed('ArrowRight')) {
    player.rotate(DIRECTION.RIGHT);
    player.move(1, 0);
  }

  // Boundary collision
  if (player.x < 0) player.x = 0;
  if (player.x > CANVAS_WIDTH - TANK_SIZE) player.x = CANVAS_WIDTH - TANK_SIZE;
  if (player.y < 0) player.y = 0;
  if (player.y > CANVAS_HEIGHT - TANK_SIZE) player.y = CANVAS_HEIGHT - TANK_SIZE;

  // Wall collision
  if (CollisionDetector.checkTankWallCollision(player, walls)) {
    player.x = oldX;
    player.y = oldY;
  }

  // Handle shooting
  if (input.isKeyPressed('Space')) {
    const bullet = player.shoot();
    if (bullet) {
      bullets.push(bullet);
    }
  }

  // Update cooldown
  player.updateCooldown();
}

function updateEnemies() {
  enemies.forEach(enemy => {
    // Store old position
    const oldX = enemy.x;
    const oldY = enemy.y;

    // AI: Random direction change
    enemy.aiDirectionTimer--;
    if (enemy.aiDirectionTimer <= 0) {
      enemy.rotate(Math.floor(Math.random() * 4)); // Random direction 0-3
      enemy.aiDirectionTimer = Math.random() * 120 + 60; // Reset timer (1-3 seconds)
    }

    // Move in current direction
    switch (enemy.direction) {
      case DIRECTION.UP:
        enemy.move(0, -1);
        break;
      case DIRECTION.DOWN:
        enemy.move(0, 1);
        break;
      case DIRECTION.LEFT:
        enemy.move(-1, 0);
        break;
      case DIRECTION.RIGHT:
        enemy.move(1, 0);
        break;
    }

    // Boundary collision - bounce back and change direction
    if (enemy.x < 0 || enemy.x > CANVAS_WIDTH - TANK_SIZE || 
        enemy.y < 0 || enemy.y > CANVAS_HEIGHT - TANK_SIZE) {
      enemy.x = oldX;
      enemy.y = oldY;
      enemy.rotate(Math.floor(Math.random() * 4)); // Pick new random direction
    }

    // Wall collision
    if (CollisionDetector.checkTankWallCollision(enemy, walls)) {
      enemy.x = oldX;
      enemy.y = oldY;
      enemy.rotate(Math.floor(Math.random() * 4)); // Pick new random direction
    }

    // AI: Random shooting
    enemy.aiShootTimer--;
    if (enemy.aiShootTimer <= 0) {
      const bullet = enemy.shoot();
      if (bullet) {
        bullets.push(bullet);
      }
      enemy.aiShootTimer = Math.random() * 90 + 90; // Reset timer (1.5-3 seconds)
    }

    // Update cooldown
    enemy.updateCooldown();
  });
}

function checkCollisions() {
  // Bullet-tank collisions
  const bulletTankCollisions = CollisionDetector.checkBulletTankCollision(bullets, [player, ...enemies]);
  bulletTankCollisions.forEach(({ bullet, tank }) => {
    // Remove bullet
    const bulletIndex = bullets.indexOf(bullet);
    if (bulletIndex > -1) bullets.splice(bulletIndex, 1);
    
    if (tank === player) {
      // Player hit - lose life
      playerLives--;
      player.x = CANVAS_WIDTH / 2 - TANK_SIZE / 2;
      player.y = CANVAS_HEIGHT - TANK_SIZE - 32;
    } else {
      // Enemy hit - remove enemy
      const enemyIndex = enemies.indexOf(tank);
      if (enemyIndex > -1) enemies.splice(enemyIndex, 1);
    }
  });
  
  // Bullet-wall collisions
  const bulletWallCollisions = CollisionDetector.checkBulletWallCollision(bullets, walls);
  bulletWallCollisions.forEach(({ bullet, wall }) => {
    // Remove bullet
    const bulletIndex = bullets.indexOf(bullet);
    if (bulletIndex > -1) bullets.splice(bulletIndex, 1);
    
    // Remove wall if destructible (brick)
    if (wall.takeDamage()) {
      const wallIndex = walls.indexOf(wall);
      if (wallIndex > -1) walls.splice(wallIndex, 1);
    }
  });
  
  // Bullet-bullet collisions
  const bulletBulletCollisions = CollisionDetector.checkBulletBulletCollision(bullets);
  bulletBulletCollisions.forEach(({ bullet1, bullet2 }) => {
    const index1 = bullets.indexOf(bullet1);
    const index2 = bullets.indexOf(bullet2);
    
    // Remove both bullets (remove higher index first to avoid shifting)
    if (index1 > index2) {
      if (index1 > -1) bullets.splice(index1, 1);
      if (index2 > -1) bullets.splice(index2, 1);
    } else {
      if (index2 > -1) bullets.splice(index2, 1);
      if (index1 > -1) bullets.splice(index1, 1);
    }
  });
  
  // Bullet-base collisions
  if (base && !base.destroyed) {
    const bulletBaseCollisions = CollisionDetector.checkBulletBaseCollision(bullets, base);
    bulletBaseCollisions.forEach(({ bullet }) => {
      // Remove bullet
      const bulletIndex = bullets.indexOf(bullet);
      if (bulletIndex > -1) bullets.splice(bulletIndex, 1);
      
      // Destroy base
      base.takeDamage();
    });
  }
}

function checkGameState() {
  // Game over conditions
  if (playerLives <= 0 || (base && base.destroyed)) {
    gameState = 'GAME_OVER';
  }
  
  // Win condition
  if (enemies.length === 0) {
    gameState = 'WIN';
  }
}

function updateBullets() {
  // Update all bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].update();
    
    // Remove off-screen bullets
    if (bullets[i].isOffScreen()) {
      bullets.splice(i, 1);
    }
  }
}

function renderGame() {
  // Render walls
  walls.forEach(wall => {
    const color = wall.type === 'brick' ? BRICK_COLOR : STEEL_COLOR;
    renderer.drawRect(wall.x, wall.y, wall.width, wall.height, color);
  });
  
  // Render base
  if (base && !base.destroyed) {
    renderer.drawRect(base.x, base.y, base.width, base.height, BASE_COLOR);
  }
  
  // Render player tank
  if (playerLives > 0) {
    renderer.drawRect(player.x, player.y, player.width, player.height, PLAYER_COLOR);
  }
  
  // Render enemy tanks
  enemies.forEach(enemy => {
    renderer.drawRect(enemy.x, enemy.y, enemy.width, enemy.height, ENEMY_COLOR);
  });
  
  // Render bullets
  bullets.forEach(bullet => {
    renderer.drawRect(bullet.x, bullet.y, bullet.width, bullet.height, BULLET_COLOR);
  });
}

// Restart game
function restartGame() {
  // Reset player
  player.x = CANVAS_WIDTH / 2 - TANK_SIZE / 2;
  player.y = CANVAS_HEIGHT - TANK_SIZE - 32;
  playerLives = 3;
  
  // Clear and respawn enemies
  enemies.length = 0;
  initEnemies();
  
  // Clear bullets
  bullets.length = 0;
  
  // Reset walls and base
  walls.length = 0;
  initLevel();
  
  // Reset game state
  gameState = 'PLAYING';
}

// Listen for restart key
window.addEventListener('keydown', (e) => {
  if (e.code === 'KeyR' && (gameState === 'GAME_OVER' || gameState === 'WIN')) {
    restartGame();
  }
});

// Start game
console.log('Battle City MVP - Starting game loop...');
requestAnimationFrame(gameLoop);
