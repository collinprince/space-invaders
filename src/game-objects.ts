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
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export class PlayerMissile extends GameObject {
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  // we will deem a missile dead after it has left the canvas
  isAlive(): boolean {
    return this.y > 0;
  }
}

export class EnemyMissile extends GameObject {
  draw(ctx: CanvasRenderingContext2D): void {}
}

export type WorldState = {
  player: PlayerShip;
  gameObjects: Array<GameObject>;
};
