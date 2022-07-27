import { GameObject } from "./game-object";
import { Point } from "../types";
const EXPLOSION_WIDTH = 5;
const EXPLOSION_HEIGHT = 5;
const EXPLOSION_LIFETIME = 10;

export const createExplosion = (startPoint: Point): Explosion =>
  new Explosion(startPoint);

class Explosion extends GameObject {
  private lifetime_: number;
  constructor(startPoint: Point) {
    super(
      startPoint.x,
      startPoint.y,
      EXPLOSION_WIDTH,
      EXPLOSION_HEIGHT,
      0,
      0,
      drawExplosion
    );
    this.lifetime_ = 0;
  }

  lifetime(): number {
    return this.lifetime_;
  }

  isAlive = (): boolean => {
    return this.lifetime_ < EXPLOSION_LIFETIME;
  };

  incrementLifeTime(): void {
    ++this.lifetime_;
  }
}

function drawExplosion(this: Explosion, ctx: CanvasRenderingContext2D) {
  this.incrementLifeTime();
  ctx.strokeStyle = "yellow";
  // point of explosion will be center of explosion graphic
  ctx.beginPath();
  [-this.lifetime(), this.lifetime()].forEach((xOffset: number) => {
    [-this.lifetime(), this.lifetime()].forEach((yOffset) => {
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + xOffset, this.y + yOffset);
    });
  });
  ctx.moveTo(this.x, this.y);
  ctx.closePath();
  ctx.stroke();
}
