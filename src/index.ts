import { Key, parseKey } from "./input-handling";
import {
  WorldState,
  init,
  drawAndUpdateWorld,
  detectPlayerMissileAndEnemyShipCollisions,
  detectEnemyMissileAndPlayerShipCollisions,
  clearDeadGameObjectsFromWorld,
  randomlyGenerateEnemyMissiles,
  gameStateMachineUpdate,
} from "./world";

import { stateMachine } from "./state-machine/game-state-machine";

// import { StateMachine } from "./state-machine/state-machine";
// create state machine object in here,
// probably define specific states for this application in a diff folder
// or nested folder of state-machine?
// the state type will be State<GameMode, UserInput> though

import { displayText } from "./utils/display-text";

import { CanvasDimensions } from "./types";

const canvas: HTMLCanvasElement = document.getElementById(
  "canvas"
) as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext(
  "2d"
) as CanvasRenderingContext2D;

const NUM_ENEMIES: number = 10;
let canvasDimensions: CanvasDimensions = {
  canvasWidth: canvas.width,
  canvasHeight: canvas.height,
};

// initialize world
let world: WorldState = init(canvasDimensions, NUM_ENEMIES);

function animate() {
  const { canvasWidth, canvasHeight } = canvasDimensions;
  // clear canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  gameStateMachineUpdate(
    world,
    { keyDown: Key.NoOp, keyUp: Key.NoOp },
    canvasDimensions
  );

  stateMachine.transition({
    keyDown: Key.NoOp,
    keyUp: Key.NoOp,
    world,
  });

  // write information for user to screen (lives remaining, title text, etc.)
  displayText(ctx, world, canvasDimensions);

  // randomly generate attacks against the player
  randomlyGenerateEnemyMissiles(world);

  // draw player and game objects, update their positions afterwards
  drawAndUpdateWorld(ctx, canvasWidth, canvasHeight, world);

  // detect collisions between player missiles and enemy ships
  detectPlayerMissileAndEnemyShipCollisions(world);
  // detect collisions between enemy missiles and player ship
  detectEnemyMissileAndPlayerShipCollisions(world);
  // clear out dead game objects
  clearDeadGameObjectsFromWorld(world);
  // call next animation frame
  requestAnimationFrame(animate);
}

// listen for user inputs with keydown and keyup
document.addEventListener("keydown", (e: KeyboardEvent) => {
  gameStateMachineUpdate(
    world,
    { keyDown: parseKey(e), keyUp: Key.NoOp },
    canvasDimensions
  );

  stateMachine.transition({ keyDown: parseKey(e), keyUp: Key.NoOp, world });
  // parseInputAndReturnAction(e, world);
  // action(world);
});

document.addEventListener("keyup", (e: KeyboardEvent) => {
  gameStateMachineUpdate(
    world,
    { keyDown: Key.NoOp, keyUp: parseKey(e) },
    canvasDimensions
  );

  stateMachine.transition({
    keyDown: Key.NoOp,
    keyUp: parseKey(e),
    world,
  });
  // parseInputAndStopPlayerMoving(e, world);
});

animate();
