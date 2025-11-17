import { BG_COLOR } from './constants.js';

export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  clear() {
    this.ctx.fillStyle = BG_COLOR;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawRect(x, y, width, height, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  drawText(text, x, y, color = '#FFFFFF', fontSize = 16) {
    this.ctx.fillStyle = color;
    this.ctx.font = `${fontSize}px Arial`;
    this.ctx.fillText(text, x, y);
  }

  drawTextCentered(text, y, color = '#FFFFFF', fontSize = 48) {
    this.ctx.fillStyle = color;
    this.ctx.font = `${fontSize}px Arial`;
    const metrics = this.ctx.measureText(text);
    const x = (this.canvas.width - metrics.width) / 2;
    this.ctx.fillText(text, x, y);
  }
}
