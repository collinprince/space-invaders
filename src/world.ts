import { GameObject } from "./game-objects/game-object";
import { PlayerShip, STARTING_NUM_LIVES } from "./game-objects/player-ship";
import { objectsAreColliding } from "./utils/boundaries";
import { Point, CanvasDimensions, GameMode } from "./types";
import { createPlayerShip } from "./game-objects/player-ship";
import { createEnemyShip } from "./game-objects/enemy-ship";
import { createEnemyMissile } from "./game-objects/enemy-missile";
import { createExplosion } from "./game-objects/explosion";

export type WorldState = {
  player: PlayerShip;
  playerMissiles: Array<GameObject>;
  enemies: Array<GameObject>;
  enemyMissiles: Array<GameObject>;
  explosions: Array<GameObject>;
  maxX: number;
  maxY: number;
  gameMode: GameMode;
};

// function to create a world object in a startup state
export const init = (
  { canvasWidth, canvasHeight }: CanvasDimensions,
  numEnemies: number
): WorldState => {
  let playerStart: Point = { x: canvasWidth / 2 - 10, y: canvasHeight - 100 };
  let world: WorldState = {
    player: createPlayerShip(playerStart),
    playerMissiles: new Array(),
    enemies: new Array(),
    enemyMissiles: new Array(),
    explosions: new Array(),
    maxX: canvasWidth,
    maxY: canvasHeight,
    gameMode: GameMode.Start,
  };
  return world;
};

const NUM_ENEMIES: number = 10;

export const reset = (
  world: WorldState,
  canvasDimensions: CanvasDimensions
): void => {
  let playerStart: Point = {
    x: canvasDimensions.canvasWidth / 2 - 10,
    y: canvasDimensions.canvasHeight - 100,
  };
  world.player.setPosition(playerStart.x, playerStart.y);
  world.player.numLives = STARTING_NUM_LIVES;
  for (let i = 0; i < NUM_ENEMIES; ++i) {
    let point: Point = {
      x: 20 + (canvasDimensions.canvasWidth / NUM_ENEMIES) * i,
      y: canvasDimensions.canvasHeight / 10,
    };
    world.enemies.push(createEnemyShip(point));
  }
};

export const drawAndUpdateWorld = (
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  world: WorldState
): void => {
  if (world.gameMode === GameMode.Play) {
    world.player.draw(ctx);
    world.player.updatePosition(canvasWidth, canvasHeight);

    [
      world.playerMissiles,
      world.enemies,
      world.enemyMissiles,
      world.explosions,
    ].forEach((l) => {
      l.forEach((x) => {
        x.draw(ctx);
        x.updatePosition(canvasWidth, canvasHeight);
      });
    });
  }
};

const CHANCE_MISSILES: number = 0.001;

export const randomlyGenerateEnemyMissiles = (world: WorldState): void => {
  world.enemies.forEach((enemy) => {
    if (Math.random() < CHANCE_MISSILES) {
      let startPoint: Point = {
        x: enemy.x + enemy.width / 2,
        y: enemy.y + enemy.height,
      };
      world.enemyMissiles.push(createEnemyMissile(startPoint, world.maxY));
    }
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
        world.explosions.push(
          createExplosion({
            x: playerMissile.x + playerMissile.width / 2,
            y: playerMissile.y,
          })
        );
      }
    });
  });
};

export const detectEnemyMissileAndPlayerShipCollisions = (
  world: WorldState
): void => {
  world.enemyMissiles.forEach((enemyMissile) => {
    if (objectsAreColliding(world.player, enemyMissile)) {
      world.player.decrementLives();
      enemyMissile.alive = false;
      world.explosions.push(
        createExplosion({
          x: enemyMissile.x + enemyMissile.width / 2,
          y: enemyMissile.y,
        })
      );
    }
  });
};

export const clearDeadGameObjectsFromWorld = (world: WorldState): void => {
  [world.playerMissiles, world.enemies, world.enemyMissiles, world.explosions] =
    [
      world.playerMissiles,
      world.enemies,
      world.enemyMissiles,
      world.explosions,
    ].map((l: Array<GameObject>) => {
      return l.filter((x: GameObject) => x.isAlive());
    });
};
