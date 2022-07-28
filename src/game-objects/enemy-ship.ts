import { GameObject } from "./game-object";
import { Point } from "../types";

const ENEMY_WIDTH: number = 20;
const ENEMY_HEIGHT: number = 20;
const ENEMY_DX: number = ENEMY_WIDTH / 40;
const ENEMY_DY: number = 0;

class EnemyShip extends GameObject {
  internalClock: number;
  startPoint: Point;
  constructor(startPoint: Point, updatePosition: (this: EnemyShip) => void) {
    super(
      startPoint.x,
      startPoint.y,
      ENEMY_WIDTH,
      ENEMY_HEIGHT,
      ENEMY_DX,
      ENEMY_DY,
      drawEnemyShip,
      { updatePosition }
    );
    this.internalClock = 0;
    this.startPoint = startPoint;
  }
}
export const createEnemyShip = (startPoint: Point): EnemyShip => {
  return new EnemyShip(startPoint, updatePositionEnemySideToSideShip);
};

export const createCirclingEnemyShip = (startPoint: Point): EnemyShip => {
  return new EnemyShip(startPoint, updatePositionCirclingEnemyShip);
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

const SIDE_TO_SIDE_LIFETIME = 40;

function updatePositionEnemySideToSideShip(this: EnemyShip): void {
  // on each 8th tick, switch direction of missile
  this.x += this.dx;
  this.internalClock += 1;
  if (this.internalClock == SIDE_TO_SIDE_LIFETIME) {
    this.internalClock = 0;
    this.dx = -this.dx;
  }
}

const CIRCLE_RADIUS = 30;
const CIRCLE_LIFETIME = 360;

const degreesToRadians = (degrees: number): number => (Math.PI / 180) * degrees;

function updatePositionCirclingEnemyShip(this: EnemyShip): void {
  this.x =
    this.startPoint.x +
    Math.cos(degreesToRadians(this.internalClock)) * CIRCLE_RADIUS;
  this.y =
    this.startPoint.y +
    Math.sin(degreesToRadians(this.internalClock)) * CIRCLE_RADIUS;
  this.internalClock = (this.internalClock + 1) % CIRCLE_LIFETIME;
}
