import { State } from "./state";
import { Key } from "../input-handling";
import { WorldState, reset } from "../world";
import { StateMachine } from "./state-machine";
import { PLAYER_MOVING_SPEED } from "../game-objects/player-ship";
import { createPlayerMissile } from "../game-objects/player-missile";
import { Point, GameMode } from "../types";
import { getCanvasDimensions } from "../utils/canvas-helpers";

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
  (input: InputType) => {
    if (input.world.enemies.length === 0) {
      reset(input.world, getCanvasDimensions());
    }
  }
);

const Play = new State<GameMode, InputType>(
  GameMode.Play,
  (input: InputType) => {
    const { world } = input;
    if (world.enemies.length === 0) {
      return GameMode.Won;
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
  (input: InputType) => {
    // end world's activity
    const { world } = input;
    world.playerMissiles = [];
    world.enemyMissiles = [];
    world.explosions = [];
    // disable player activity
    world.player.setDx(0);
  }
);

const Lost = new State<GameMode, InputType>(
  GameMode.Lost,
  (input: InputType) => {
    if (input.keyDown === Key.Spacebar) {
      return GameMode.Start;
    }
    return GameMode.Lost;
  },
  (input: InputType) => {
    // end world's activity
    const { world } = input;
    world.playerMissiles = [];
    world.enemies = [];
    world.enemyMissiles = [];
    world.explosions = [];
    // disable player activity
    world.player.setDx(0);
  }
);

export const stateMachine = new StateMachine<GameMode, InputType>(
  GameMode.Start,
  [Start, Play, Won, Lost]
);
