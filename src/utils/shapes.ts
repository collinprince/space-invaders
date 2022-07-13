import { Point } from "../types";

export function drawTriangle (ctx: CanvasRenderingContext2D, topPoint: Point, rightPoint: Point, leftPoint: Point): void {
    ctx.beginPath();
    ctx.moveTo(topPoint.x, topPoint.y);
    ctx.lineTo(rightPoint.x, rightPoint.y);
    ctx.lineTo(leftPoint.x, leftPoint.y);
    ctx.closePath();
    ctx.stroke();
};

