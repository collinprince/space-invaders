import { Point } from "../types";

export const drawTriangleFill = (
  ctx: CanvasRenderingContext2D,
  topPoint: Point,
  rightPoint: Point,
  leftPoint: Point
) => drawTriangle(ctx, topPoint, rightPoint, leftPoint, true);
export const drawTriangleOutline = (
  ctx: CanvasRenderingContext2D,
  topPoint: Point,
  rightPoint: Point,
  leftPoint: Point
) => drawTriangle(ctx, topPoint, rightPoint, leftPoint, false);

function drawTriangle(
  ctx: CanvasRenderingContext2D,
  topPoint: Point,
  rightPoint: Point,
  leftPoint: Point,
  fill: boolean
): void {
  ctx.beginPath();
  ctx.moveTo(topPoint.x, topPoint.y);
  ctx.lineTo(rightPoint.x, rightPoint.y);
  ctx.lineTo(leftPoint.x, leftPoint.y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  ctx.stroke();
}

export function drawCircle(
  ctx: CanvasRenderingContext2D,
  center: Point,
  radius: number
) {
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
  ctx.stroke();
}
