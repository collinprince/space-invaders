import { CanvasDimensions, GameMode } from "../types";
import { WorldState } from "../world";
import {
  writeText,
  textDimensions,
  textWidth,
  getCanvasDimensions,
} from "./canvas-helpers";

const formatAndDisplayTitleText = (
  ctx: CanvasRenderingContext2D,
  titleText: string,
  subtitleText: string
): void => {
  const { canvasWidth, canvasHeight } = getCanvasDimensions();
  const titleTextDimensions = textDimensions(ctx, titleText);
  const spacebarTextWidth = textWidth(ctx, subtitleText);
  const paddingHeight = 10;
  writeText(ctx, titleText, {
    x: canvasWidth / 2 - titleTextDimensions.width / 2,
    y: canvasHeight / 2 - titleTextDimensions.height / 2,
  });
  writeText(ctx, subtitleText, {
    x: canvasWidth / 2 - spacebarTextWidth / 2,
    y: canvasHeight / 2 + titleTextDimensions.height / 2 + paddingHeight,
  });
};

export const displayText = (
  ctx: CanvasRenderingContext2D,
  world: WorldState
) => {
  if (world.gameMode === GameMode.Start) {
    formatAndDisplayTitleText(
      ctx,
      "SPACE INVADERS",
      "Press spacebar to begin."
    );
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
  } else if (world.gameMode === GameMode.BetweenLevels) {
    formatAndDisplayTitleText(
      ctx,
      "LEVEL BEATEN!",
      "Press spacebar to play next level."
    );
  } else if (world.gameMode === GameMode.Won) {
    formatAndDisplayTitleText(ctx, "YOU WON!", "Press spacebar to play again.");
  } else {
    // Lost
    formatAndDisplayTitleText(
      ctx,
      "GAME OVER!",
      "Press spacebar to play again."
    );
  }
};
