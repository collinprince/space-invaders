import { Point } from "../types";

export const writeText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  point: Point,
  font: string = "20px Arial",
  fillStyle: string = "black"
): void => {
  ctx.fillStyle = fillStyle;
  ctx.font = font;
  ctx.fillText(text, point.x, point.y);
};
