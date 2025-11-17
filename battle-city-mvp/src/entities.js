import { TANK_SIZE, BULLET_SIZE, WALL_SIZE, BASE_SIZE, PLAYER_SPEED, ENEMY_SPEED, BULLET_SPEED, DIRECTION, CANVAS_WIDTH, CANVAS_HEIGHT } from './constants.js';

export class Tank {
  constructor(x, y, type = 'player') {
    this.x = x;
    this.y = y;
    this.width = TANK_SIZE;
    this.height = TANK_SIZE;
    this.type = type;
    this.speed = type === 'player' ? PLAYER_SPEED : ENEMY_SPEED;
    this.direction = DIRECTION.UP;
    this.canShoot = true;
    this.shootCooldown = 0;
  }

  move(dx, dy) {
    this.x += dx * this.speed;
    this.y += dy * this.speed;
  }

  rotate(newDirection) {
    this.direction = newDirection;
  }

  updateCooldown() {
    if (this.shootCooldown > 0) {
      this.shootCooldown--;
      if (this.shootCooldown === 0) {
        this.canShoot = true;
      }
    }
  }

  shoot() {
    if (!this.canShoot) {
      return null;
    }

    // Calculate bullet spawn position (front of tank)
    let bulletX = this.x + this.width / 2 - BULLET_SIZE / 2;
    let bulletY = this.y + this.height / 2 - BULLET_SIZE / 2;

    // Offset bullet to tank front based on direction
    switch (this.direction) {
      case DIRECTION.UP:
        bulletY = this.y - BULLET_SIZE;
        break;
      case DIRECTION.DOWN:
        bulletY = this.y + this.height;
        break;
      case DIRECTION.LEFT:
        bulletX = this.x - BULLET_SIZE;
        break;
      case DIRECTION.RIGHT:
        bulletX = this.x + this.width;
        break;
    }

    // Set cooldown
    this.canShoot = false;
    this.shootCooldown = 30; // ~0.5 seconds at 60 FPS

    return new Bullet(bulletX, bulletY, this.direction, this.type);
  }
}

export class Bullet {
  constructor(x, y, direction, owner) {
    this.x = x;
    this.y = y;
    this.width = BULLET_SIZE;
    this.height = BULLET_SIZE;
    this.direction = direction;
    this.speed = BULLET_SPEED;
    this.owner = owner;
  }

  update() {
    switch (this.direction) {
      case DIRECTION.UP:
        this.y -= this.speed;
        break;
      case DIRECTION.DOWN:
        this.y += this.speed;
        break;
      case DIRECTION.LEFT:
        this.x -= this.speed;
        break;
      case DIRECTION.RIGHT:
        this.x += this.speed;
        break;
    }
  }

  isOffScreen() {
    return this.x < -this.width || 
           this.x > CANVAS_WIDTH || 
           this.y < -this.height || 
           this.y > CANVAS_HEIGHT;
  }
}

export class Wall {
  constructor(x, y, type = 'brick') {
    this.x = x;
    this.y = y;
    this.width = WALL_SIZE;
    this.height = WALL_SIZE;
    this.type = type;
    this.destructible = type === 'brick';
  }

  takeDamage() {
    if (this.destructible) {
      return true; // Mark for removal
    }
    return false;
  }
}

export class Base {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = TANK_SIZE;
    this.height = TANK_SIZE;
    this.destroyed = false;
  }

  takeDamage() {
    this.destroyed = true;
  }
}
