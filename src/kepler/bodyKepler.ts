import {Vector2} from "../utils/vector2";
import {center, getRandomInt, isInCanvas, randomRadian} from "../utils/utils";

export class BodyKepler {
    id: number;
    position: Vector2;
    positionHistory: Vector2[] = [];
    parent: BodyKepler | null;
    private readonly color: string;
    private static bodyCounter = 0;
    private pointSize: number;

    public constructor(initialPosition: Vector2, initialVelocity: Vector2, parent: BodyKepler | null, pointSize?: number, color?: string) {
        this.id = BodyKepler.bodyCounter;
        BodyKepler.bodyCounter++;

        this.position = initialPosition;

        let orbitAngle = randomRadian();
        this.position.rotateInPlaceBy(orbitAngle);

        if (parent != null) {
            this.position.addInPlace(parent.position);
        }

        this.parent = parent;
        this.pointSize = pointSize ? pointSize : 10;

        this.color = color ? color : `rgb(${getRandomInt(50, 255)}, ${getRandomInt(50, 255)}, ${getRandomInt(50, 255)})`

    }

    public update(acceleration: Vector2) {
        this.positionHistory.push(this.position.clone());
    }

    public draw(renderCtx: CanvasRenderingContext2D, traceCtx: CanvasRenderingContext2D, relativePosition: Vector2) {
        if(!isInCanvas(this.position.subtract(relativePosition).add(center))) return;
        renderCtx.fillStyle = this.color;
        traceCtx.fillStyle = this.color;
        if (this.positionHistory.length > 0) {
            let position = this.positionHistory[this.positionHistory.length - 1];
            traceCtx.beginPath();
            traceCtx.arc(position.x - relativePosition.x + center.x, position.y - relativePosition.y + center.y, Math.min(this.pointSize / 3, 3), 0, 6.28);
            traceCtx.closePath();
        }
        renderCtx.beginPath();
        renderCtx.arc(this.position.x - relativePosition.x + center.x, this.position.y - relativePosition.y + center.y, this.pointSize, 0, 6.28);
        renderCtx.closePath();
    }
}