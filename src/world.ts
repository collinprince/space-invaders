import { GameObject } from "./game-objects/game-object";
import {
  PlayerShip,
  PLAYER_MOVING_SPEED,
  STARTING_NUM_LIVES,
} from "./game-objects/player-ship";
import { objectsAreColliding } from "./utils/boundaries";
import { Point, CanvasDimensions } from "./types";
import { createPlayerShip } from "./game-objects/player-ship";
import { createEnemyShip } from "./game-objects/enemy-ship";
import { createEnemyMissile } from "./game-objects/enemy-missile";
import { createPlayerMissile } from "./game-objects/player-missile";
import { Key, UserInput } from "./input-handling";

export enum GameMode {
  Start,
  Play,
  Won,
  Lost,
}

export type WorldState = {
  player: PlayerShip;
  playerMissiles: Array<GameObject>;
  enemies: Array<GameObject>;
  enemyMissiles: Array<GameObject>;
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
    maxX: canvasWidth,
    maxY: canvasHeight,
    gameMode: GameMode.Start,
  };
  return world;
};

const reset = (world: WorldState, canvasDimensions: CanvasDimensions): void => {
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

    [world.playerMissiles, world.enemies, world.enemyMissiles].forEach((l) => {
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
    }
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

const transitionToStart = (world: WorldState) =>
  (world.gameMode = GameMode.Start);
const transitionToPlay = (world: WorldState) =>
  (world.gameMode = GameMode.Play);
const transitionToWon = (world: WorldState) => (world.gameMode = GameMode.Won);
const transitionToLost = (world: WorldState) =>
  (world.gameMode = GameMode.Lost);

const NUM_ENEMIES: number = 10;

export const gameStateMachineUpdate = (
  world: WorldState,
  input: UserInput,
  canvasDimensions: CanvasDimensions
): void => {
  if (world.gameMode === GameMode.Start) {
    if (input.keyDown === Key.Spacebar) {
      transitionToPlay(world);
      reset(world, canvasDimensions);
      return;
    }
  } else if (world.gameMode === GameMode.Play) {
    if (world.enemies.length === 0) {
      transitionToWon(world);
      return;
    } else if (world.player.numLives === 0) {
      transitionToLost(world);
      return;
    }
    // handle key down
    if (input.keyDown === Key.Left) {
      world.player.setDx(-PLAYER_MOVING_SPEED);
    } else if (input.keyDown === Key.Right) {
      world.player.setDx(PLAYER_MOVING_SPEED);
    } else if (input.keyDown === Key.Spacebar) {
      let playerShipStartPoint: Point = {
        x: world.player.x,
        y: world.player.y,
      };
      world.playerMissiles.push(
        // player's origin is given to player missile's factory function
        // which handles setting up its correct start point
        createPlayerMissile(playerShipStartPoint)
      );
    }

    // handle key up
    if (input.keyUp === Key.Left && world.player.dx < 0) {
      world.player.setDx(0);
    } else if (input.keyUp === Key.Right && world.player.dx > 0) {
      world.player.setDx(0);
    }
  } else if (world.gameMode === GameMode.Won) {
    // end world's activity
    world.playerMissiles = [];
    world.enemyMissiles = [];
    // disable player activity
    world.player.setDx(0);
    if (input.keyDown === Key.Spacebar) {
      transitionToStart(world);
    }
  } else if (world.gameMode === GameMode.Lost) {
    // end world's activity
    world.playerMissiles = [];
    world.enemies = [];
    world.enemyMissiles = [];
    // disable player activity
    world.player.setDx(0);
    if (input.keyDown === Key.Spacebar) {
      transitionToStart(world);
    }
  }
};
