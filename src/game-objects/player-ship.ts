import { GameObject } from "./game-object";
import { Point } from "../types";

export const PLAYER_SHIP_WIDTH: number = 20;
export const PLAYER_SHIP_HEIGHT: number = 30;

const STARTING_NUM_LIVES: number = 3;

export class PlayerShip extends GameObject {
  numLives: number;
  constructor(startPoint: Point) {
    super(
      startPoint.x,
      startPoint.y,
      PLAYER_SHIP_WIDTH,
      PLAYER_SHIP_HEIGHT,
      0,
      0,
      playerShipDraw,
      { updatePosition: playerShipUpdatePosition, isAlive: isAlivePlayer }
    );
    this.numLives = STARTING_NUM_LIVES;
  }

  decrementLives(): void {
    this.numLives -= 1;
  }
}

export const createPlayerShip = (startPoint: Point): PlayerShip => {
  return new PlayerShip(startPoint);
};

function playerShipDraw(this: GameObject, ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.moveTo(this.x, this.y + this.height); // bottom left of left wing
  ctx.lineTo(this.x, this.y + this.height / 2); // top left of left wing
  ctx.lineTo(this.x + this.width / 5, this.y + this.height / 2); // top right of left wing
  ctx.lineTo(this.x + this.width / 5, this.y + this.height * (5 / 8)); // top left of midsection
  ctx.lineTo(this.x + this.width * (9 / 20), this.y); // top left of head
  ctx.lineTo(this.x + this.width * (11 / 20), this.y); // top right of head
  ctx.lineTo(this.x + this.width * (4 / 5), this.y + this.height * (5 / 8)); // top right of midsection
  ctx.lineTo(this.x + this.width * (4 / 5), this.y + this.height / 2); // top left of right wing
  ctx.lineTo(this.x + this.width, this.y + this.height / 2); // top right of right wing
  ctx.lineTo(this.x + this.width, this.y + this.height); // bottom right of right wing
  ctx.lineTo(this.x + this.width * (4 / 5), this.y + this.height); // bottom left of right wing
  ctx.lineTo(this.x + this.width * (4 / 5), this.y + this.height * (7 / 8)); // bottom right of midsection
  ctx.lineTo(this.x + this.width * (1 / 5), this.y + this.height * (7 / 8)); // bottom left of midsection
  ctx.lineTo(this.x + this.width * (1 / 5), this.y + this.height); // bottom right of left wing
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function playerShipUpdatePosition(
  this: PlayerShip,
  canvasWidth: number,
  _: number
): void {
  this.x += this.dx;

  if (this.x < 0) this.x = 0;
  if (this.x + this.width >= canvasWidth) this.x = canvasWidth - this.width;
}

function isAlivePlayer(this: PlayerShip): boolean {
  return this.numLives > 0;
}
