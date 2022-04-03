import {CANVAS_HEIGHT, CANVAS_WIDTH, G} from "./index";
import {Vector2} from "./vector2";

export function getRandomInt(a: number, b: number) {
    return Math.floor(Math.random()*(b-a)+a);
}

export function randomRadian() {
    return Math.random() * Math.PI * 2;
}

export function nrand(mean: number, std: number): number {
    // Box-Muller transform
    //https://www.baeldung.com/cs/uniform-to-normal-distribution
    return mean + std * Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random());
}

export function getCircularOrbitalSpeed(parentMass: number, orbitRadius: number) {
    return Math.sqrt(G * parentMass / orbitRadius);
}

export function isInCanvas(position: Vector2) {
    return position.x >= 0 && position.y >= 0 && position.x <= CANVAS_WIDTH && position.y <= CANVAS_HEIGHT;
}