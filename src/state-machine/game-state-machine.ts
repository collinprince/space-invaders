import { State } from "./state";
import { Key } from "../input-handling";
import { WorldState } from "../world";
import { StateMachine } from "./state-machine";
import { PLAYER_MOVING_SPEED } from "../game-objects/player-ship";
import { createPlayerMissile } from "../game-objects/player-missile";
import { Point, GameMode } from "../types";
import { getCanvasDimensions } from "../utils/canvas-helpers";
import { setNextLevel } from "../levels/levels";

export type InputType = {
  keyDown: Key;
  keyUp: Key;
  world: WorldState;
};

const Start = new State<GameMode, InputType>(
  GameMode.Start,
  (input: InputType) => {
    if (input.keyDown === Key.Spacebar) {
      return GameMode.Play;
    }
    return GameMode.Start;
  },
  (input: InputType) => {},
  {
    exitBehavior: (input: InputType) => {
      input.world.player.numLives = 3;
      input.world.currentLevel = 0;
    },
  }
);

const Play = new State<GameMode, InputType>(
  GameMode.Play,
  (input: InputType) => {
    const { world } = input;
    if (world.enemies.length === 0) {
      return GameMode.BetweenLevels;
    } else if (world.player.numLives === 0) {
      return GameMode.Lost;
    }
    return GameMode.Play;
  },
  (input: InputType) => {
    const { keyDown, keyUp, world } = input;
    // handle key down
    if (keyDown === Key.Left) {
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
  },
  {
    enterBehavior: (input: InputType) => {
      const { canvasWidth, canvasHeight } = getCanvasDimensions();
      let playerStart: Point = {
        x: canvasWidth / 2 - 10,
        y: canvasHeight - 100,
      };
      input.world.player.setPosition(playerStart.x, playerStart.y);
      setNextLevel(input.world);
    },
    exitBehavior: (input: InputType) => {
      // end game activity
      input.world.enemies = [];
      input.world.enemyMissiles = [];
      input.world.playerMissiles = [];
      input.world.explosions = [];
      input.world.player.setDx(0);
    },
  }
);

const Won = new State<GameMode, InputType>(
  GameMode.Won,
  (input: InputType) => {
    if (input.keyDown === Key.Spacebar) {
      return GameMode.Start;
    }
    return GameMode.Won;
  },
  (input: InputType) => {}
);

const Lost = new State<GameMode, InputType>(
  GameMode.Lost,
  (input: InputType) => {
    if (input.keyDown === Key.Spacebar) {
      return GameMode.Start;
    }
    return GameMode.Lost;
  },
  (input: InputType) => {}
);

const BetweenLevels = new State<GameMode, InputType>(
  GameMode.BetweenLevels,
  (input: InputType) => {
    if (input.keyDown === Key.Spacebar) {
      return GameMode.Play;
    }
    return GameMode.BetweenLevels;
  },
  (input: InputType) => {},
  {
    exitBehavior: (input: InputType) => {
      ++input.world.currentLevel;
    },
  }
);

export const stateMachine = new StateMachine<GameMode, InputType>(
  GameMode.Start,
  [Start, Play, Won, Lost, BetweenLevels]
);
