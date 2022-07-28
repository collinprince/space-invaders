import { getCanvasDimensions } from "../utils/canvas-helpers";
import { WorldState } from "../world";
import { GameMode, Point } from "../types";
import {
  createEnemyShip,
  createAttackingEnemyShip,
  createCirclingEnemyShip,
} from "../game-objects/enemy-ship";

const { canvasWidth, canvasHeight } = getCanvasDimensions();

// there's no current logic to end game, just loops infinitely between existing levels

const levels = [levelOne, levelTwo];

export const setNextLevel = (world: WorldState): void => {
  const currentLevel = world.currentLevel;
  levels[currentLevel % levels.length](world);
};

function levelOne(world: WorldState) {
  const numEnemies = 10;
  for (let i = 0; i < numEnemies; ++i) {
    let point: Point = {
      x: 20 + (canvasWidth / numEnemies) * i,
      y: canvasHeight / 10,
    };
    world.enemies.push(createEnemyShip(point));
  }
}

function levelTwo(world: WorldState) {
  const numNormal = 5;
  const numCircle = 5;
  for (let i = 0; i < numNormal; ++i) {
    let point: Point = {
      x: 20 + (canvasWidth / numNormal) * i,
      y: canvasHeight / 10,
    };
    world.enemies.push(createEnemyShip(point));
  }

  for (let i = 0; i < numCircle; ++i) {
    let point: Point = {
      x: 30 + (canvasWidth / numNormal) * i,
      y: (2 * canvasHeight) / 10,
    };
    world.enemies.push(createCirclingEnemyShip(point));
  }
}
