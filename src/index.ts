import { drawTriangle } from "./utils/shapes";
import { Point } from "./types";
import { GameObject, PlayerShip, EnemyShip, WorldState } from "./game-objects";
import {
  parseInputAndReturnAction,
  parseInputAndStopPlayerMoving,
  WorldModifierFunc,
} from "./input-handling";

const canvas: HTMLCanvasElement = document.getElementById(
  "canvas"
) as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext(
  "2d"
) as CanvasRenderingContext2D;

function init(): WorldState {
  let world: WorldState = {
    player: new PlayerShip(
      canvas.width / 2 - 10,
      canvas.height - 100,
      20,
      30,
      0,
      0
    ),
    playerMissiles: new Array(),
    enemies: new Array(),
    enemyMissiles: new Array(),
  };
  for (let i = 0; i < 10; ++i) {
    world.enemies.push(
      new EnemyShip(
        20 + (canvas.width / 10) * i,
        canvas.height / 10,
        10,
        10,
        0,
        0
      )
    );
  }
  return world;
}

let world: WorldState = init();

function animate() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw player and game objects, update their positions afterwards
  world.player.draw(ctx);
  world.player.updatePosition();
  [world.playerMissiles, world.enemies, world.enemyMissiles].forEach((l) => {
    l.forEach((x) => {
      x.draw(ctx);
      x.updatePosition();
    });
  });

  // clear out dead game objects
  [world.playerMissiles, world.enemies, world.enemyMissiles] = [
    world.playerMissiles,
    world.enemies,
    world.enemyMissiles,
  ].map((l: Array<GameObject>) => {
    return l.filter((x: GameObject) => x.isAlive());
  });
  requestAnimationFrame(animate);
}

document.addEventListener("keydown", (e: KeyboardEvent) => {
  let action: WorldModifierFunc = parseInputAndReturnAction(e);
  action(world);
});

document.addEventListener("keyup", (e: KeyboardEvent) => {
  parseInputAndStopPlayerMoving(e, world);
});

animate();
