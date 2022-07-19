import { GameObject } from "./game-object";
import { Point } from "../types";

const ENEMY_MISSILE_WIDTH: number = 1;
const ENEMY_MISSILE_HEIGHT: number = 1;
const ENEMY_MISSILE_DX: number = 0;
const ENEMY_MISSILE_DY: number = -1;

export const createEnemyMissile = (startPoint: Point): GameObject =>
  new GameObject(
    startPoint.x,
    startPoint.y,
    ENEMY_MISSILE_WIDTH,
    ENEMY_MISSILE_HEIGHT,
    ENEMY_MISSILE_DX,
    ENEMY_MISSILE_DY,
    drawEnemyMissile
  );

function drawEnemyMissile(ctx: CanvasRenderingContext2D): void {
  ctx.fillRect(this.x, this.y, this.width, this.height);
}
