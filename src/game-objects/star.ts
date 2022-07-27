import { GameObject } from "./game-object";
import { Point } from "../types";

const STAR_WIDTH: number = 1;
const STAR_HEIGHT: number = 1;
const STAR_SPEED: number = 1;

export const createStar = (startPoint: Point): GameObject =>
  new GameObject(
    startPoint.x,
    startPoint.y,
    STAR_WIDTH,
    STAR_HEIGHT,
    0,
    -STAR_SPEED,
    function (this: GameObject, ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = "white";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    {
      isAlive: function (this: GameObject) {
        return this.y >= 0;
      },
    }
  );
