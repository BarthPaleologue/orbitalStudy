import {Vector2} from "./vector2";
import {center} from "./index";

let colors = ["red", "cyan", "green", "gray", "white"];

export class Body {
    id: number;
    mass: number;
    position: Vector2;
    positionHistory: Vector2[] = [];
    velocity: Vector2;
    private readonly color: string;
    private static bodyCounter = 0;

    public constructor(mass: number, initialPosition: Vector2, initialVelocity: Vector2, color?: string) {
        this.id = Body.bodyCounter;
        Body.bodyCounter++;

        this.mass = mass;
        this.position = initialPosition;
        this.velocity = initialVelocity;
        this.color = color ? color : colors[Math.floor(Math.random() * colors.length)];
    }

    public update(acceleration: Vector2) {
        this.velocity.addInPlace(acceleration);
        this.positionHistory.push(this.position.clone());
        this.position.addInPlace(this.velocity);
    }

    public draw(renderCtx: CanvasRenderingContext2D, traceCtx: CanvasRenderingContext2D, relativePosition: Vector2) {
        renderCtx.fillStyle = this.color;
        traceCtx.fillStyle = this.color;
        if (this.positionHistory.length > 0) {
            let position = this.positionHistory[this.positionHistory.length - 1];
            traceCtx.beginPath();
            traceCtx.arc(position.x - relativePosition.x + center.x, position.y - relativePosition.y + center.y, 2, 0, 6.28);
            traceCtx.closePath();
        }
        renderCtx.beginPath();
        renderCtx.arc(this.position.x - relativePosition.x + center.x, this.position.y - relativePosition.y + center.y, 5 + Math.log10(1 + 100*this.mass), 0, 6.28);
        renderCtx.closePath();
    }
}