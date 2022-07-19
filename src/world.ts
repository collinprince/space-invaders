import { GameObject } from "./game-objects/game-object";
import { objectsAreColliding } from "./utils/boundaries";
import { Point } from "./types";
import { createPlayerShip } from "./game-objects/player-ship";
import { createEnemyShip } from "./game-objects/enemy-ship";

export type WorldState = {
  player: GameObject;
  playerMissiles: Array<GameObject>;
  enemies: Array<GameObject>;
  enemyMissiles: Array<GameObject>;
};

// function to create a world object in a startup state
export const init = (
  canvasWidth: number,
  canvasHeight: number,
  numEnemies: number
): WorldState => {
  let playerStart: Point = { x: canvasWidth / 2 - 10, y: canvasHeight - 100 };
  let world: WorldState = {
    player: createPlayerShip(playerStart),
    playerMissiles: new Array(),
    enemies: new Array(),
    enemyMissiles: new Array(),
  };
  for (let i = 0; i < numEnemies; ++i) {
    let point: Point = {
      x: 20 + (canvasWidth / numEnemies) * i,
      y: canvasHeight / 10,
    };
    world.enemies.push(createEnemyShip(point));
  }
  return world;
};

export const drawAndUpdateWorld = (
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  world: WorldState
): void => {
  world.player.draw(ctx);
  world.player.updatePosition(canvasWidth, canvasHeight);
  [world.playerMissiles, world.enemies, world.enemyMissiles].forEach((l) => {
    l.forEach((x) => {
      x.draw(ctx);
      x.updatePosition(canvasWidth, canvasHeight);
    });
  });
};

export const detectPlayerMissileAndEnemyShipCollisions = (
  world: WorldState
): void => {
  world.enemies.forEach((enemy) => {
    world.playerMissiles.forEach((playerMissile) => {
      if (objectsAreColliding(enemy, playerMissile)) {
        enemy.alive = false;
        playerMissile.alive = false;
      }
    });
  });
};

export const clearDeadGameObjectsFromWorld = (world: WorldState): void => {
  [world.playerMissiles, world.enemies, world.enemyMissiles] = [
    world.playerMissiles,
    world.enemies,
    world.enemyMissiles,
  ].map((l: Array<GameObject>) => {
    return l.filter((x: GameObject) => x.isAlive());
  });
};
