import { drawTriangleFill } from "./utils/shapes";
import { Point } from "./types";

export abstract class GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  dx: number;
  dy: number;
  alive: boolean;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    dx: number,
    dy: number
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dx = dx;
    this.dy = dy;
    this.alive = true;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;

  setX(x: number): void {
    this.x = x;
  }

  setY(y: number): void {
    this.y = y;
  }

  setDx(dx: number): void {
    this.dx = dx;
  }

  setDy(dy: number): void {
    this.dy = dy;
  }

  setPosition(x: number, y: number): void {
    this.setX(x);
    this.setY(y);
  }

  setDirection(dx: number, dy: number): void {
    this.setDx(dx);
    this.setDy(dy);
  }

  updatePosition(): void {
    this.x += this.dx;
    this.y += this.dy;
  }

  isAlive(): boolean {
    return this.alive;
  }
}

export class EnemyShip extends GameObject {
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export class PlayerShip extends GameObject {
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.height); // bottom left of left wing
    ctx.lineTo(this.x, this.y + this.height / 2); // top left of left wing
    ctx.lineTo(this.x + this.width / 5, this.y + this.height / 2); // top right of left wing
    ctx.lineTo(this.x + this.width / 5, this.y + this.height * (5 / 8)); // top left of midsection
    // ctx.lineTo(this.x + this.width * (2 / 5), this.y + this.height * (5 / 8)); // bottom left of head
    ctx.lineTo(this.x + this.width * (9 / 20), this.y); // top left of head
    ctx.lineTo(this.x + this.width * (11 / 20), this.y); // top right of head
    // ctx.lineTo(this.x + this.width * (3 / 5), this.y + this.height * (5 / 8)); // bottom right of head
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

    // ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export class PlayerMissile extends GameObject {
  draw(ctx: CanvasRenderingContext2D): void {
    // define points of the triangle
    let topPoint: Point = { x: this.x + this.width / 2, y: this.y };
    let rightPoint: Point = { x: this.x + this.width, y: this.y + this.height };
    let leftPoint: Point = { x: this.x, y: this.y + this.height };

    ctx.fillStyle = "black";
    drawTriangleFill(ctx, topPoint, rightPoint, leftPoint);
  }

  // we will deem a missile dead after it has left the canvas
  isAlive(): boolean {
    return this.alive && this.y > 0;
  }
}

export class EnemyMissile extends GameObject {
  draw(ctx: CanvasRenderingContext2D): void {}
}

export type WorldState = {
  player: PlayerShip;
  playerMissiles: Array<PlayerMissile>;
  enemies: Array<EnemyShip>;
  enemyMissiles: Array<EnemyMissile>;
};
