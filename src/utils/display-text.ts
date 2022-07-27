import { CanvasDimensions, GameMode } from "../types";
import { WorldState } from "../world";
import { writeText, textDimensions, textWidth } from "./canvas-helpers";

export const displayText = (
  ctx: CanvasRenderingContext2D,
  world: WorldState,
  canvasDimensions: CanvasDimensions
) => {
  const { canvasWidth, canvasHeight } = canvasDimensions;

  if (world.gameMode === GameMode.Start) {
    const titleText = "SPACE INVADERS";
    const spacebarText = "Press spacebar to begin.";
    const titleTextDimensions = textDimensions(ctx, titleText);
    const spacebarTextWidth = textWidth(ctx, spacebarText);
    const paddingHeight = 10;
    writeText(ctx, titleText, {
      x: canvasWidth / 2 - titleTextDimensions.width / 2,
      y: canvasHeight / 2 - titleTextDimensions.height / 2,
    });
    writeText(ctx, spacebarText, {
      x: canvasWidth / 2 - spacebarTextWidth / 2,
      y: canvasHeight / 2 + titleTextDimensions.height / 2 + paddingHeight,
    });
  } else if (world.gameMode === GameMode.Play) {
    // inform user of how many enemies they have left to kill
    writeText(ctx, `Enemies remaining: ${world.enemies.length}`, {
      x: 10,
      y: 20,
    });
    writeText(ctx, `Lives remaining: ${world.player.numLives}`, {
      x: 10,
      y: 50,
    });
  } else if (world.gameMode === GameMode.Won) {
    const winnerText = "YOU WON!";
    const playAgainText = "Press spacebar to play again.";
    const winnerTextDimensions = textDimensions(ctx, winnerText);
    const playAgainTextWidth = textWidth(ctx, playAgainText);
    const paddingHeight = 10;
    writeText(ctx, winnerText, {
      x: canvasWidth / 2 - winnerTextDimensions.width / 2,
      y: canvasHeight / 2 - winnerTextDimensions.height / 2,
    });
    writeText(ctx, playAgainText, {
      x: canvasWidth / 2 - playAgainTextWidth / 2,
      y: canvasHeight / 2 + winnerTextDimensions.height / 2 + paddingHeight,
    });
  } else {
    // Lost
    const loserText = "GAME OVER!";
    const playAgainText = "Press spacebar to play again.";
    const loserTextDimensions = textDimensions(ctx, loserText);
    const playAgainTextWidth = textWidth(ctx, playAgainText);
    const paddingHeight = 10;
    writeText(ctx, loserText, {
      x: canvasWidth / 2 - loserTextDimensions.width / 2,
      y: canvasHeight / 2 - loserTextDimensions.height / 2,
    });
    writeText(ctx, playAgainText, {
      x: canvasWidth / 2 - playAgainTextWidth / 2,
      y: canvasHeight / 2 + loserTextDimensions.height / 2 + paddingHeight,
    });
  }
};
