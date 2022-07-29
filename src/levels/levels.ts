import { getCanvasDimensions } from "../utils/canvas-helpers";
import { WorldState } from "../world";
import { Point } from "../types";
import {
  createEnemyShip,
  createAttackingEnemyShip,
  createCirclingEnemyShip,
} from "../game-objects/enemy-ship";

const { canvasWidth, canvasHeight } = getCanvasDimensions();

// there's no current logic to end game, just loops infinitely between existing levels

const levels = [levelOne, levelTwo, levelThree, levelFour, levelFive];

export const setNextLevel = (world: WorldState): void => {
  // mod for safety in case hasPlayerWon wasn't checked and current level got inc'd again
  levels[world.currentLevel % levels.length](world);
};

// call this after player has beaten currentLevel
export const hasPlayerWon = (world: WorldState): boolean =>
  world.currentLevel + 1 === levels.length;

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

function levelThree(world: WorldState) {
  const numNormal = 3;
  const numCircle = 3;
  const numAttacking = 3;
  for (let i = 0; i < numNormal; ++i) {
    let point: Point = {
      x: (canvasWidth / numNormal) * i + canvasWidth / (2 * numNormal),
      y: (2 * canvasHeight) / 10,
    };
    world.enemies.push(createEnemyShip(point));
  }

  for (let i = 0; i < numCircle; ++i) {
    let point: Point = {
      x: (canvasWidth / numNormal) * i + canvasWidth / (2 * numNormal),
      y: (2 * canvasHeight) / 10,
    };
    world.enemies.push(createCirclingEnemyShip(point));
  }

  for (let i = 0; i < numAttacking; ++i) {
    let point: Point = {
      x: canvasWidth / numNormal + i * (canvasWidth / numNormal / 2),
      y: canvasHeight / 10,
    };
    world.enemies.push(createAttackingEnemyShip(point));
  }
}

function levelFour(world: WorldState) {
  const numNormal = 10;
  const numAttacking = 10;
  const numTopRowEnemies = numNormal + numAttacking;
  for (let i = 0; i < numTopRowEnemies; ++i) {
    let point: Point = {
      x:
        (i * canvasWidth) / numTopRowEnemies +
        canvasWidth / numTopRowEnemies / 2,
      y: canvasHeight / 10,
    };
    if (i % 2 == 0) {
      world.enemies.push(createAttackingEnemyShip(point));
    } else {
      point.x -= 10; // little bit of position hacking
      world.enemies.push(createEnemyShip(point));
    }
  }

  const numCircle = 5;
  for (let i = 0; i < numCircle; ++i) {
    let point: Point = {
      x: (i * canvasWidth) / numCircle + canvasWidth / numCircle / 2,
      y: (3 * canvasHeight) / 10,
    };
    world.enemies.push(createCirclingEnemyShip(point));
  }
}

const createAttackingV = (world: WorldState, topLeftShipStart: Point) => {
  let point: Point = topLeftShipStart;
  const enemyShipRef = createAttackingEnemyShip({ ...point }); // left top
  const [enemyWidth, enemyHeight] = [enemyShipRef.width, enemyShipRef.height];
  world.enemies.push(enemyShipRef); // [0, 1]
  point.x += enemyWidth * 2.5; // [2.5, 3.5]
  world.enemies.push(createAttackingEnemyShip({ ...point })); // right top
  point.x -= 2 * enemyWidth; // [0.5, 1.5]
  point.y += 1.5 * enemyHeight;
  world.enemies.push(createAttackingEnemyShip({ ...point })); // left middle
  point.x += 1.5 * enemyWidth; // [2, 3]
  world.enemies.push(createAttackingEnemyShip({ ...point })); // right middle
  point.x -= 0.75 * enemyWidth;
  point.y += 1.5 * enemyHeight;
  world.enemies.push(createAttackingEnemyShip({ ...point })); // center bottom
};

function levelFive(world: WorldState) {
  // create object just to get enemy width and height
  const _enemyShip = createEnemyShip({ x: 0, y: 0 });
  const [enemyWidth, enemyHeight] = [_enemyShip.width, _enemyShip.height];
  const widthFlyingV = 3.5 * enemyWidth;
  const heightFlyingV = 4 * enemyHeight;

  const numFlyingVs = 5;
  for (let i = 0; i < numFlyingVs; ++i) {
    const sectionSize = canvasWidth / numFlyingVs;
    // center our flying v in its section of screen
    let x = i * sectionSize;
    x += sectionSize / 2;
    x -= widthFlyingV / 2;
    let point: Point = {
      x,
      y: canvasHeight / 10,
    };
    createAttackingV(world, point);
  }

  const numNormalDefendersInRow = 10;
  const numDefenderRows = 2;
  const normalDefenderSectionSize = canvasWidth / numNormalDefendersInRow;
  const startingYOffset = canvasWidth / 10 + heightFlyingV + enemyHeight * 0.5;
  for (let row = 0; row < numDefenderRows; ++row) {
    for (let col = 0; col < numNormalDefendersInRow; ++col) {
      let point: Point = {
        x: col * normalDefenderSectionSize + normalDefenderSectionSize / 2 - 10,
        y: startingYOffset + row * enemyHeight * 1.5,
      };
      world.enemies.push(createEnemyShip(point));
    }
  }
}
