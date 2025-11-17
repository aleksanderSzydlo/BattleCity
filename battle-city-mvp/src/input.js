export class InputHandler {
  constructor() {
    this.keys = new Map();
    
    // Add event listeners
    window.addEventListener('keydown', (e) => {
      this.keys.set(e.code, true);
    });
    
    window.addEventListener('keyup', (e) => {
      this.keys.set(e.code, false);
    });
  }

  isKeyPressed(keyCode) {
    return this.keys.get(keyCode) === true;
  }
}
