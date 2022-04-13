import {BodyKepler} from "./bodyKepler";
import {Vector2} from "../utils/vector2";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    clampedNRand,
    getRandomInt,
    nrand,
} from "../utils/utils";
import {getOrbitalPeriodFromOrbit} from "../utils/keplerUtils";

let renderCanvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
renderCanvas.width = CANVAS_WIDTH;
renderCanvas.height = CANVAS_HEIGHT;

let traceCanvas = document.getElementById("traceCanvas") as HTMLCanvasElement;
traceCanvas.width = CANVAS_WIDTH;
traceCanvas.height = CANVAS_HEIGHT;

let renderCtx = renderCanvas.getContext("2d");
let traceCtx = traceCanvas.getContext("2d");

let bodies: BodyKepler[] = [];

// SUN
let sunMass = 1e10;
let sun = new BodyKepler(10, 10,20, null,20,"yellow");
bodies.push(sun);

for(let i = 1; i < getRandomInt(3, 7); i++) {
    let dist = i * clampedNRand(90, 10, 70, 110);
    let periapsis = dist * clampedNRand(0.9, 0.1, 0.75, 1.0);
    let apoapsis = dist * clampedNRand(1.1, 0.1, 1.0, 1.3);
    let mass = 1e9 * nrand(1, 0.2);
    let orbitalPeriod = getOrbitalPeriodFromOrbit(periapsis, apoapsis, mass, sunMass);
    let body = new BodyKepler(orbitalPeriod, periapsis, apoapsis, sun, 10);
    bodies.push(body);

    for(let j = 1; j < getRandomInt(1, 4); j++) {
        let satelliteMass = 1e5;
        let dist2 = j * clampedNRand(15, 1, 10, 20);
        let periapsis2 = dist2 * clampedNRand(0.9, 0.05, 0.5, 1.0);
        let apoapsis2 = dist2 * clampedNRand(1.1, 0.05, 1.0, 1.5);
        let orbitalPeriod2 = getOrbitalPeriodFromOrbit(periapsis2, apoapsis2, satelliteMass, mass);
        let satellite = new BodyKepler(orbitalPeriod2, periapsis2, apoapsis2, body, 5);
        bodies.push(satellite);
    }
}
console.table(bodies)

let relativeIndex = 0;

function render() {
    renderCtx.clearRect(0, 0, renderCtx.canvas.width, renderCtx.canvas.height);
    for (let body of bodies) {
        body.draw(renderCtx, traceCtx, relativeIndex == -1 ? new Vector2(0, 0) : bodies[relativeIndex].position);
        renderCtx.fill();
        traceCtx.fill();
    }
}

function update() {

    let t = Date.now() / 1000;

    for(const body of bodies) {
        body.update(t / body.orbitalPeriod);
    }

    render();
    requestAnimationFrame(update)
}

requestAnimationFrame(update);



document.addEventListener("keydown", e => {
    if(!isNaN(Number(e.key))) {
        relativeIndex = Number(e.key);
        traceCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
})