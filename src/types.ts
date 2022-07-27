export type Point = {
  x: number;
  y: number;
};

type Velocity = {
  dx: number;
  dy: number;
};

export type CanvasDimensions = {
  canvasWidth: number;
  canvasHeight: number;
};

export enum GameMode {
  Start = 0,
  Play = 1,
  Won = 2,
  Lost = 3,
}
