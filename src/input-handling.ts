export enum Key {
  Left,
  Right,
  Spacebar,
  NoOp,
}

export type UserInput = {
  keyDown: Key;
  keyUp: Key;
};

const isLeftKey = (key: string): boolean =>
  key === "ArrowLeft" || key === "Left";
const isRightKey = (key: string): boolean =>
  key === "ArrowRight" || key === "Right";
const isSpacebar = (key: string): boolean => key === " " || key === "Spacebar";

export const parseKey = (e: KeyboardEvent): Key => {
  if (isLeftKey(e.key)) {
    return Key.Left;
  } else if (isRightKey(e.key)) {
    return Key.Right;
  } else if (isSpacebar(e.key)) {
    return Key.Spacebar;
  }
  return Key.NoOp;
};
