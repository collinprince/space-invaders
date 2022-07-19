import { GameObject } from "./game-object";
import { Point } from "../types";

const ENEMY_WIDTH: number = 20;
const ENEMY_HEIGHT: number = 20;
const ENEMY_DX: number = 0;
const ENEMY_DY: number = 0;
export const createEnemyShip = (startPoint: Point): GameObject => {
  return new GameObject(
    startPoint.x,
    startPoint.y,
    ENEMY_WIDTH,
    ENEMY_HEIGHT,
    ENEMY_DX,
    ENEMY_DY,
    drawEnemyShip
  );
};

function drawEnemyShip(this: GameObject, ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = "red";
  ctx.fillRect(this.x, this.y, this.width, this.height);
}
