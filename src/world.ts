import { GameObject } from "./game-objects/game-object";
import { PlayerShip, STARTING_NUM_LIVES } from "./game-objects/player-ship";
import { objectsAreColliding } from "./utils/boundaries";
import { Point, CanvasDimensions, GameMode } from "./types";
import { createPlayerShip } from "./game-objects/player-ship";
import {
  createEnemyShip,
  createCirclingEnemyShip,
  createAttackingEnemyShip,
} from "./game-objects/enemy-ship";
import { createEnemyMissile } from "./game-objects/enemy-missile";
import { createExplosion } from "./game-objects/explosion";
import { createStar } from "./game-objects/star";
import { getCanvasDimensions } from "./utils/canvas-helpers";

const CHANCE_STAR = 0.002;

export type WorldState = {
  player: PlayerShip;
  playerMissiles: Array<GameObject>;
  enemies: Array<GameObject>;
  enemyMissiles: Array<GameObject>;
  explosions: Array<GameObject>;
  stars: Array<GameObject>;
  maxX: number;
  maxY: number;
  gameMode: GameMode;
  currentLevel: number;
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
    stars: new Array(),
    explosions: new Array(),
    maxX: canvasWidth,
    maxY: canvasHeight,
    gameMode: GameMode.Start,
    currentLevel: 0,
  };
  return world;
};

export const drawAndUpdateWorld = (
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  world: WorldState
): void => {
  // draw stars no matter what mode we are in
  // draw/update stars first to avoid drawing stars on top of other objects
  world.stars.forEach((star) => {
    star.draw(ctx);
    star.updatePosition(canvasWidth, canvasHeight);
  });
  if (world.gameMode === GameMode.Play) {
    // draw player
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

export const randomlyGenerateStars = (world: WorldState): void => {
  const { canvasWidth, canvasHeight } = getCanvasDimensions();
  for (let x = 0; x < canvasWidth; ++x) {
    if (Math.random() < CHANCE_STAR) {
      world.stars.push(createStar({ x, y: 0 }));
    }
  }
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

export const detectPlayerShipAndEnemyShipCollisions = (
  world: WorldState
): void => {
  world.enemies.forEach((enemy) => {
    if (objectsAreColliding(world.player, enemy)) {
      world.player.decrementLives();
      enemy.alive = false;
      world.explosions.push(
        createExplosion({
          x: enemy.x + enemy.width / 2,
          y: enemy.y + enemy.height,
        })
      );
    }
  });
};

export const clearDeadGameObjectsFromWorld = (world: WorldState): void => {
  [
    world.playerMissiles,
    world.enemies,
    world.enemyMissiles,
    world.explosions,
    world.stars,
  ] = [
    world.playerMissiles,
    world.enemies,
    world.enemyMissiles,
    world.explosions,
    world.stars,
  ].map((l: Array<GameObject>) => {
    return l.filter((x: GameObject) => x.isAlive());
  });
};
