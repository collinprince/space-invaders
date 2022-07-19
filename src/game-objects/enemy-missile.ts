import { GameObject } from "./game-object";
import { Point } from "../types";

const ENEMY_MISSILE_WIDTH: number = 5;
const ENEMY_MISSILE_HEIGHT: number = 5;
const ENEMY_MISSILE_DX: number = 0;
const ENEMY_MISSILE_DY: number = 3;

class EnemyMissile extends GameObject {
  maxY: number;
  constructor(startPoint: Point, maxY: number) {
    super(
      startPoint.x,
      startPoint.y,
      ENEMY_MISSILE_WIDTH,
      ENEMY_MISSILE_HEIGHT,
      ENEMY_MISSILE_DX,
      ENEMY_MISSILE_DY,
      drawEnemyMissile,
      { isAlive: isAliveEnemyMissile }
    );
    this.maxY = maxY;
  }
}

export const createEnemyMissile = (
  startPoint: Point,
  maxY: number
): EnemyMissile => new EnemyMissile(startPoint, maxY);

function drawEnemyMissile(
  this: EnemyMissile,
  ctx: CanvasRenderingContext2D
): void {
  ctx.fillRect(this.x, this.y, this.width, this.height);
}

function isAliveEnemyMissile(this: EnemyMissile): boolean {
  return this.alive && this.y < this.maxY;
}
