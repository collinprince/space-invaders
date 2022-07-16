import { WorldState, PlayerMissile } from "./game-objects";

const PLAYER_SPEED = 5;
const PLAYER_MISSILE_SPEED = 10;

const PLAYER_MISSILE_WIDTH = 5;
const PLAYER_MISSILE_HEIGHT = 10;

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
  world.player.setDx(-PLAYER_SPEED);
};
const onArrowRight = (world: WorldState) => {
  world.player.setDx(PLAYER_SPEED);
};
const onSpacebar = (world: WorldState) => {
  world.playerMissiles.push(
    // choosing player missile starting point is a bit awkward
    // since it's being drawn as a triangle, but game objects are
    // represented internally/collision detected as a rectangle

    // player missile's "top left" origin point is
    // at the same y value as its triangle point and
    // the same x as its bottom left point
    new PlayerMissile(
      world.player.x + world.player.width / 2 - PLAYER_MISSILE_WIDTH / 2,
      world.player.y - PLAYER_MISSILE_HEIGHT,
      PLAYER_MISSILE_WIDTH,
      PLAYER_MISSILE_HEIGHT,
      0,
      -PLAYER_MISSILE_SPEED
    )
  );
};
