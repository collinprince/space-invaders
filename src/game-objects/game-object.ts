type GameObjectCustomParams = {
  updatePosition?: (canvasWidth: number, canvasHeight: number) => void;
  isAlive?: () => boolean;
};

export class GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  dx: number;
  dy: number;
  alive: boolean;
  draw: (ctx: CanvasRenderingContext2D) => void;
  updatePosition: (canvasWidth: number, canvasHeight: number) => void;
  isAlive: () => boolean;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    dx: number,
    dy: number,
    draw: (ctx: CanvasRenderingContext2D) => void,
    {
      updatePosition = defaultUpdatePosition,
      isAlive = defaultIsAlive,
    }: GameObjectCustomParams = {
      updatePosition: defaultUpdatePosition,
      isAlive: defaultIsAlive,
    }
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dx = dx;
    this.dy = dy;
    this.draw = draw;
    this.updatePosition = updatePosition;
    this.isAlive = isAlive;
    this.alive = true;
  }

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
}

function defaultIsAlive(this: GameObject): boolean {
  return this.alive;
}

function defaultUpdatePosition(this: GameObject): void {
  this.x += this.dx;
  this.y += this.dy;
}
