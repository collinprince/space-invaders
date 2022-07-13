import { WorldState, PlayerMissile } from "./game-objects";

const isLeftKey = (key: string): boolean => key === 'ArrowLeft' || key === 'Left';
const isRightKey = (key: string): boolean => key === 'ArrowRight' || key === 'Right';
const isSpacebar = (key: string): boolean => key === ' ' || key === 'Spacebar';



export type WorldModifierFunc = (w: WorldState) => void;

const noOp = (_: WorldState) => {};

export const parseInputAndReturnAction = (e: KeyboardEvent): WorldModifierFunc => {    
    if (isLeftKey(e.key)) {
        return onArrowLeft;
    } else if (isRightKey(e.key)) {
        return onArrowRight;    
    } else if (isSpacebar(e.key)) {
        return onSpacebar;        
    }
    return noOp;
}

export const parseInputAndStopPlayerMoving = (e: KeyboardEvent, world: WorldState): void => {
    if (isLeftKey(e.key) && world.player.dx < 0) {
        world.player.dx = 0;
    } else if (isRightKey(e.key) && world.player.dx > 0) {
        world.player.dx = 0;
    }
}

const onArrowLeft = (world: WorldState) => {
    world.player.setDx(-1);
}
const onArrowRight = (world: WorldState) => {
    world.player.setDx(1);
};
const onSpacebar = (world: WorldState) => {
    world.gameObjects.push(new PlayerMissile(
        world.player.x,
        world.player.y,
        5,
        5,
        0,
        -2
    ));
};