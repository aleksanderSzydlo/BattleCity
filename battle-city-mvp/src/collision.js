export class CollisionDetector {
  // AABB (Axis-Aligned Bounding Box) collision detection
  static checkAABB(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  }

  // Check bullet-tank collisions
  static checkBulletTankCollision(bullets, tanks) {
    const collisions = [];
    
    bullets.forEach(bullet => {
      tanks.forEach(tank => {
        // Only check if bullet owner is different from tank type
        if (bullet.owner !== tank.type && this.checkAABB(bullet, tank)) {
          collisions.push({ bullet, tank });
        }
      });
    });
    
    return collisions;
  }

  // Check bullet-wall collisions
  static checkBulletWallCollision(bullets, walls) {
    const collisions = [];
    
    bullets.forEach(bullet => {
      walls.forEach(wall => {
        if (this.checkAABB(bullet, wall)) {
          collisions.push({ bullet, wall });
        }
      });
    });
    
    return collisions;
  }

  // Check tank-wall collision (single tank)
  static checkTankWallCollision(tank, walls) {
    for (let wall of walls) {
      if (this.checkAABB(tank, wall)) {
        return true;
      }
    }
    return false;
  }

  // Check bullet-bullet collisions
  static checkBulletBulletCollision(bullets) {
    const collisions = [];
    
    for (let i = 0; i < bullets.length; i++) {
      for (let j = i + 1; j < bullets.length; j++) {
        if (bullets[i].owner !== bullets[j].owner && 
            this.checkAABB(bullets[i], bullets[j])) {
          collisions.push({ bullet1: bullets[i], bullet2: bullets[j] });
        }
      }
    }
    
    return collisions;
  }

  // Check bullet-base collision
  static checkBulletBaseCollision(bullets, base) {
    const collisions = [];
    
    bullets.forEach(bullet => {
      if (this.checkAABB(bullet, base)) {
        collisions.push({ bullet, base });
      }
    });
    
    return collisions;
  }
}
