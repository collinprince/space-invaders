import { WorldState } from "./world";
import { createPlayerMissile } from "./game-objects/player-missile";
import { Point } from "./types";

const PLAYER_MOVING_SPEED = 5;
const isLeftKey = (key: string): boolean =>
  key === "ArrowLeft" || key === "Left";
const isRightKey = (key: string): boolean =>
  key === "ArrowRight" || key === "Right";
const isSpacebar = (key: string): boolean => key === " " || key === "Spacebar";

export type WorldModifierFunc = (w: WorldState) => void;

const noOp = (_: WorldState) => {};

export const parseInputAndReturnAction = (
  e: KeyboardEvent
): WorldModifierFunc => {
  if (isLeftKey(e.key)) {
    return onArrowLeft;
  } else if (isRightKey(e.key)) {
    return onArrowRight;
  } else if (isSpacebar(e.key)) {
    return onSpacebar;
  }
  return noOp;
};

export const parseInputAndStopPlayerMoving = (
  e: KeyboardEvent,
  world: WorldState
): void => {
  if (isLeftKey(e.key) && world.player.dx < 0) {
    world.player.dx = 0;
  } else if (isRightKey(e.key) && world.player.dx > 0) {
    world.player.dx = 0;
  }
};

const onArrowLeft = (world: WorldState) => {
  world.player.setDx(-PLAYER_MOVING_SPEED);
};
const onArrowRight = (world: WorldState) => {
  world.player.setDx(PLAYER_MOVING_SPEED);
};
const onSpacebar = (world: WorldState) => {
  let playerShipStartPoint: Point = {
    x: world.player.x,
    y: world.player.y,
  };
  world.playerMissiles.push(
    // player's origin is given to player missile's factory function
    // which handles setting up its correct start point
    createPlayerMissile(playerShipStartPoint)
  );
};
