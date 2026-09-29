import { Engine, Scene } from '@babylonjs/core';
import '@babylonjs/loaders'; // Support for .glb files

import { setupEnvironment } from './environment.js';
import { setupCamera } from './camera.js';
import { loadCorals } from './coral.js';
import { loadShellfishes } from './shellfish.js';
import { loadFishes } from './fish.js';

const canvas = document.getElementById('renderCanvas');
const engine = new Engine(canvas, true);

const createScene = function () {
    const scene = new Scene(engine);

    setupEnvironment(scene);
    setupCamera(scene);
    loadCorals(scene);
    loadShellfishes(scene);
    loadFishes(scene);

    return scene;
};

const scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener('resize', () => {
    engine.resize();
});

// --- Sound and UI management ---
let isSoundOn = false;
const soundBtn = document.getElementById('soundToggle');

// Muted by default to comply with browser autoplay restrictions
soundBtn.innerText = '🔇 Sound OFF';

// Use HTML5 Audio for streaming BGM with low memory consumption
const bgm = new Audio("./reef_camera_bgm.mp3");
bgm.loop = true;

soundBtn.addEventListener('click', () => {
    isSoundOn = !isSoundOn;
    if (isSoundOn) {
        soundBtn.innerText = '🔊 Sound ON';
        // Start playback. Logs an error if prevented by browser restrictions
        bgm.play().catch(err => {
            console.error("Failed to play BGM:", err);
        });
    } else {
        soundBtn.innerText = '🔇 Sound OFF';
        bgm.pause();
    }
});
