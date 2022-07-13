import { drawTriangle } from "./utils/shapes";
import { Point } from "./types";

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

// STUDY WEBPACK 


abstract class GameObject {
    x: number;
    y: number;
    width: number;
    height: number;    
    dx: number;
    dy: number;
    constructor(x: number, y: number, width: number, height: number, dx: number, dy: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;        
        this.dx = dx;
        this.dy = dy;
    }

    abstract draw(ctx: CanvasRenderingContext2D) : void;

    setX(x: number): void {
        this.x = x;
    }

    setY(y: number): void {
        this.y = y;
    }

    setDx(dx: number): void {
        this.dx = dx;
    }

    setDy(dy: number): void {
        this.dy = dy;
    }

    setPosition(x: number, y: number): void {
        this.setX(x);
        this.setY(y);
    }

    setDirection(dx: number, dy: number): void {
        this.setDx(dx);
        this.setDy(dy);
    }

    updatePosition(): void {
        // todo
    }
}

class EnemyShip extends GameObject {
    draw(ctx: CanvasRenderingContext2D) : void {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class PlayerShip extends GameObject {
    draw(ctx: CanvasRenderingContext2D) : void {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class PlayerMissile extends GameObject {
    draw(ctx: CanvasRenderingContext2D) : void {

    }
}

class EnemyMissile extends GameObject {
    draw(ctx: CanvasRenderingContext2D) : void {

    }
}


let gameObjects: Array<GameObject> = new Array();
function init() {
    gameObjects.push(new PlayerShip(canvas.width/2 - 10, canvas.height - 100, 20, 30, 0, 0));
    for (let i = 0; i < 10; ++i) {
        gameObjects.push(new EnemyShip(20 + canvas.width/10 * i, canvas.height/10, 10, 10, 0, 0));
    }
}

init();

function animate() {
    gameObjects.forEach(x => x.draw(ctx));
    let top: Point = { x: 20, y: 20 };
    let right: Point = { x: 30, y: 40 };
    let left: Point = { x: 10, y: 40 };
    drawTriangle(ctx, top, right, left);
    requestAnimationFrame(animate);
}

animate();