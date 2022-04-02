import {Body} from "./body";
import {Vector2} from "./vector2";
import {getCircularOrbitalSpeed, getRandomInt, nrand} from "./utils";

export const CANVAS_WIDTH = window.innerWidth;
export const CANVAS_HEIGHT = window.innerHeight;
export const center = new Vector2(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

export const G = 0.01;

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
let sunMass = 300000;
bodies.push(new Body(sunMass, new Vector2(0, 0), new Vector2(0, 0), "yellow"));

for(let i = 1; i < getRandomInt(2, 5); i++) {
    let orbitRadius = 110 * i * nrand(1, 0.1);
    let orbitalSpeed = getCircularOrbitalSpeed(sunMass, orbitRadius) * nrand(1, 0.1);
    let mass = 20;
    bodies.push(new Body(mass, new Vector2(0, orbitRadius), new Vector2(orbitalSpeed, 0)));
}

// EARTH
/*let earthOrbitRadius = 300;
let earthOrbitalSpeed = getCircularOrbitalSpeed(sunMass, earthOrbitRadius);
let earthMass = 2000;
bodies.push(new Body(earthMass, new Vector2(0, earthOrbitRadius), new Vector2(earthOrbitalSpeed, 0), "blue"));
*/
// MOON
/*let moonOrbitRadiusAroundEarth = 10;
let moonOrbitRadius = earthOrbitRadius + moonOrbitRadiusAroundEarth;
let moonOrbitalSpeed = earthOrbitalSpeed + getCircularOrbitalSpeed(earthMass, moonOrbitRadiusAroundEarth);
bodies.push(new Body(0.01, new Vector2(0, moonOrbitRadius), new Vector2(moonOrbitalSpeed, 0), "grey"));
*/
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