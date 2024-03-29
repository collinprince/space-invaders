import { Point, CanvasDimensions } from "../types";

export const writeText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  point: Point,
  font: string = "20px Arial",
  fillStyle: string = "white"
): void => {
  ctx.fillStyle = fillStyle;
  ctx.font = font;
  ctx.fillText(text, point.x, point.y);
};

export const textDimensions = (
  ctx: CanvasRenderingContext2D,
  text: string,
  font: string = "20px Arial"
) => {
  ctx.font = font;
  const metrics = ctx.measureText(text);
  return {
    width:
      Math.abs(metrics.actualBoundingBoxLeft) +
      Math.abs(metrics.actualBoundingBoxRight),
    height:
      Math.abs(metrics.actualBoundingBoxAscent) +
      Math.abs(metrics.actualBoundingBoxDescent),
  };
};

export const textWidth = (
  ctx: CanvasRenderingContext2D,
  text: string,
  font: string = "20px Arial"
) => textDimensions(ctx, text, font).width;

export const textHeight = (
  ctx: CanvasRenderingContext2D,
  text: string,
  font: string = "20px Arial"
) => textDimensions(ctx, text, font).height;

export const getCanvasDimensions = (): CanvasDimensions => {
  const canvas: HTMLCanvasElement = document.getElementById(
    "canvas"
  ) as HTMLCanvasElement;
  return {
    canvasWidth: canvas.width,
    canvasHeight: canvas.height,
  };
};
