import {Body} from "./body";
import {Vector2} from "./vector2";
import {getCircularOrbitalSpeed, getRandomInt, nrand, randomRadian} from "./utils";

export const CANVAS_WIDTH = window.innerWidth;
export const CANVAS_HEIGHT = window.innerHeight;
export const center = new Vector2(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

export const G = 0.0005;

let renderCanvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
renderCanvas.width = CANVAS_WIDTH;
renderCanvas.height = CANVAS_HEIGHT;

let traceCanvas = document.getElementById("traceCanvas") as HTMLCanvasElement;
traceCanvas.width = CANVAS_WIDTH;
traceCanvas.height = CANVAS_HEIGHT;

let renderCtx = renderCanvas.getContext("2d");
let traceCtx = traceCanvas.getContext("2d");

let bodies: Body[] = [];

// SUN
let sunMass = 2000000;
let sun = new Body(sunMass, new Vector2(0, 0), new Vector2(0, 0), null,20,"yellow");
bodies.push(sun);

for(let i = 1; i < getRandomInt(3, 5); i++) {
    let orbitRadius = 100 * i * nrand(1, 0.1);
    let orbitalSpeed = getCircularOrbitalSpeed(sunMass, orbitRadius) * nrand(1, 0.1);
    let mass = 20000 * nrand(1, 0.2);

    let initialPosition = new Vector2(0, orbitRadius);
    let initialVelocity = new Vector2(orbitalSpeed, 0);

    let body = new Body(mass, initialPosition, initialVelocity, sun, 7);
    bodies.push(body);

    for(let i = 0; i < 1; i++) {
        let moonOrbitRadiusAroundEarth = 10 * nrand(1, 0.1);
        let moonOrbitalSpeed = getCircularOrbitalSpeed(mass, moonOrbitRadiusAroundEarth);

        let initialSatellitePosition = new Vector2(0, moonOrbitRadiusAroundEarth);
        let initialSatelliteVelocity = new Vector2(moonOrbitalSpeed, 0);

        bodies.push(new Body(0.001, initialSatellitePosition, initialSatelliteVelocity, body, 4));
    }
}

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
    let accs: Vector2[] = [];
    let now = Date.now();
    for (let body of bodies) {
        let totalAcc = new Vector2(0, 0);

        for (let otherBody of bodies) {
            if (otherBody.id == body.id) continue;
            let d2 = Vector2.DistanceSquared(body.position, otherBody.position);
            let acc = Vector2.Direction(body.position, otherBody.position);
            acc.scaleInPlace(G * otherBody.mass / d2);
            totalAcc.addInPlace(acc);
        }
        accs.push(totalAcc);
    }
    console.log(Date.now() - now);
    for (const [i, body] of bodies.entries()) body.update(accs[i]);
    render();
    requestAnimationFrame(update)
}

requestAnimationFrame(update);

document.addEventListener("keydown", e => {
    switch (e.key) {
        case "0":
            relativeIndex = 0;
            traceCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            break;
        case "1":
            relativeIndex = 1;
            traceCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            break;
        case "2":
            relativeIndex = 2;
            traceCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            break;
        case ".":
            relativeIndex = -1;
            traceCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            break;
    }
})