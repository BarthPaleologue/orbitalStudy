# Study about orbital mechanics

[![CodeQL](https://github.com/BarthPaleologue/orbitalStudy/actions/workflows/codeql.yml/badge.svg)](https://github.com/BarthPaleologue/orbitalStudy/actions/workflows/codeql.yml)
[![NodeJS with Webpack](https://github.com/BarthPaleologue/orbitalStudy/actions/workflows/webpack.yml/badge.svg)](https://github.com/BarthPaleologue/orbitalStudy/actions/workflows/webpack.yml)
[![pages-build-deployment](https://github.com/BarthPaleologue/orbitalStudy/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/BarthPaleologue/orbitalStudy/actions/workflows/pages/pages-build-deployment)

The goal is to create a simple algorithm to create procedural solar systems implementing elliptical orbits and planet satellites.

![showcase](https://github.com/BarthPaleologue/orbitalStudy/blob/master/imgs/demo1.png)

## Newton

In this simple simulator we create physical bodies around a central sun, and give them tangential velocity to give them near circular orbits :

<img src="https://render.githubusercontent.com/render/math?math=v = \sqrt{ \frac{GM}{r} }">

Documentation : https://www.wikiwand.com/en/Circular_orbit#/Velocity

And then we apply Newton's second law to make them move : 

<img src="https://render.githubusercontent.com/render/math?math=a = \frac{Gm_s}{r^2}">

Yet it comes with a few drawbacks : orbits with a lot of bodies are very unstable and you have to run the entire simulation to know the position of a body at a time t. So we have to try something else.

## Kepler

We are trying to solve this equation describing the orbit of a body :

<img src="https://render.githubusercontent.com/render/math?math=M = E - \epsilon sinE">

We can't solve it exactly for E so we use approximations like Newton's method. Then we compute the orbital period using this equation :

<img src="https://render.githubusercontent.com/render/math?math=T = 2\pi a \sqrt { \frac{a}{G(m_b + m_s)} }">

Documentation : https://www.wikiwand.com/en/Kepler's_laws_of_planetary_motion#/First_law


This project has been created using **webpack-cli**, you can now run

```
npm run build
```

or

```
yarn build
```

to bundle your application
