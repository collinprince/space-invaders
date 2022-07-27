import { GameObject } from "./game-object";
import { Point } from "../types";
import { drawTriangleFill } from "../utils/shapes";
import { PLAYER_SHIP_WIDTH } from "./player-ship";

const PLAYER_MISSILE_DX: number = 0;
const PLAYER_MISSILE_DY: number = -10;
const PLAYER_MISSILE_WIDTH: number = 5;
const PLAYER_MISSILE_HEIGHT: number = 10;
export const createPlayerMissile = (
  playerShipStartPoint: Point
): GameObject => {
  // choosing player missile starting point is a bit awkward
  // since it's being drawn as a triangle, but game objects are
  // represented internally/collision detected as a rectangle

  // the "start point" for a player missile is the top left
  // of the player ship's rectangle

  // player missile's "top left" origin point is
  // at the same y value as its triangle point and
  // the same x as its bottom left point
  let startPoint: Point = {
    x:
      playerShipStartPoint.x + PLAYER_SHIP_WIDTH / 2 - PLAYER_MISSILE_WIDTH / 2,
    y: playerShipStartPoint.y - PLAYER_MISSILE_HEIGHT,
  };
  return new GameObject(
    startPoint.x,
    startPoint.y,
    PLAYER_MISSILE_WIDTH,
    PLAYER_MISSILE_HEIGHT,
    PLAYER_MISSILE_DX,
    PLAYER_MISSILE_DY,
    drawPlayerMissile,
    { isAlive: isAlivePlayerMissile }
  );
};

function drawPlayerMissile(this: GameObject, ctx: CanvasRenderingContext2D) {
  // define points of the triangle
  let topPoint: Point = { x: this.x + this.width / 2, y: this.y };
  let rightPoint: Point = { x: this.x + this.width, y: this.y + this.height };
  let leftPoint: Point = { x: this.x, y: this.y + this.height };

  ctx.fillStyle = "blue";
  ctx.strokeStyle = "white";
  drawTriangleFill(ctx, topPoint, rightPoint, leftPoint);
}

function isAlivePlayerMissile(this: GameObject) {
  return this.alive && this.y > 0;
}
