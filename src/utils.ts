import {G} from "./index";

export function getRandomInt(a: number, b: number) {
    return Math.floor(Math.random()*(b-a)+a);
}

export function nrand(mean: number, std: number): number {
    // Box-Muller transform
    //https://www.baeldung.com/cs/uniform-to-normal-distribution
    return mean + std * Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random());
}

export function getCircularOrbitalSpeed(parentMass: number, orbitRadius: number) {
    return Math.sqrt(G * parentMass / orbitRadius);
}