export const writeText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number = 10,
  y: number = 20,
  font: string = "20px Arial",
  fillStyle: string = "black"
): void => {
  ctx.fillStyle = fillStyle;
  ctx.font = font;
  ctx.fillText(text, x, y);
};
