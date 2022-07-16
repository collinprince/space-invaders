import { WorldState, PlayerMissile } from "./game-objects";

const PLAYER_SPEED = 5;
const MISSILE_SPEED = 5;

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
    new PlayerMissile(world.player.x, world.player.y, 5, 5, 0, -MISSILE_SPEED)
  );
};
