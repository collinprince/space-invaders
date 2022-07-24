import { GameObject } from "./game-object";
import { Point } from "../types";

const ENEMY_WIDTH: number = 20;
const ENEMY_HEIGHT: number = 20;
const ENEMY_DX: number = ENEMY_WIDTH / 40;
const ENEMY_DY: number = 0;

class EnemyShip extends GameObject {
  internalClock: number;
  constructor(startPoint: Point) {
    super(
      startPoint.x,
      startPoint.y,
      ENEMY_WIDTH,
      ENEMY_HEIGHT,
      ENEMY_DX,
      ENEMY_DY,
      drawEnemyShip,
      { updatePosition: updatePositionEnemyShip }
    );
    this.internalClock = 0;
  }
}
export const createEnemyShip = (startPoint: Point): EnemyShip => {
  return new EnemyShip(startPoint);
};

function drawEnemyShip(this: GameObject, ctx: CanvasRenderingContext2D): void {
  ctx.strokeStyle = "white";
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.x + this.width / 2, this.y + this.height);
  ctx.lineTo(this.x + this.width, this.y);
  ctx.lineTo(this.x + this.width / 2, this.y + this.height / 4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // ctx.fillRect(this.x, this.y, this.width, this.height);
}

function updatePositionEnemyShip(this: EnemyShip): void {
  // on each 8th tick, switch direction of missile
  this.x += this.dx;
  this.internalClock += 1;
  if (this.internalClock == 40) {
    this.internalClock = 0;
    this.dx = -this.dx;
  }
}
