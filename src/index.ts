import {
  parseInputAndReturnAction,
  parseInputAndStopPlayerMoving,
  WorldModifierFunc,
} from "./input-handling";
import { writeText } from "./utils/canvas-helpers";
import {
  WorldState,
  init,
  drawAndUpdateWorld,
  detectPlayerMissileAndEnemyShipCollisions,
  clearDeadGameObjectsFromWorld,
} from "./world";

const canvas: HTMLCanvasElement = document.getElementById(
  "canvas"
) as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext(
  "2d"
) as CanvasRenderingContext2D;

const NUM_ENEMIES: number = 10;
const canvasWidth: number = canvas.width;
const canvasHeight: number = canvas.height;

// initialize world
let world: WorldState = init(canvasWidth, canvasHeight, NUM_ENEMIES);

function animate() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // inform user of how many enemies they have left to kill
  writeText(ctx, `Enemies remaining: ${world.enemies.length}`);

  // draw player and game objects, update their positions afterwards
  drawAndUpdateWorld(ctx, canvasWidth, canvasHeight, world);

  // detect collisions between player missiles and enemy ships
  detectPlayerMissileAndEnemyShipCollisions(world);
  // clear out dead game objects
  clearDeadGameObjectsFromWorld(world);
  // call next animation frame
  requestAnimationFrame(animate);
}

// listen for user inputs with keydown and keyup
document.addEventListener("keydown", (e: KeyboardEvent) => {
  let action: WorldModifierFunc = parseInputAndReturnAction(e);
  action(world);
});

document.addEventListener("keyup", (e: KeyboardEvent) => {
  parseInputAndStopPlayerMoving(e, world);
});

animate();
