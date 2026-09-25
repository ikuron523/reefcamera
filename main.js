import { Engine, Scene, Sound } from '@babylonjs/core';
import '@babylonjs/loaders'; // .glbサポート用

import { setupEnvironment } from './environment.js';
import { setupCamera } from './camera.js';
import { loadFishes } from './fish.js';

const canvas = document.getElementById('renderCanvas');
const engine = new Engine(canvas, true);

const createScene = function () {
    const scene = new Scene(engine);

    setupEnvironment(scene);
    setupCamera(scene);
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

// --- サウンドとUIの管理 ---
let isSoundOn = true;
const soundBtn = document.getElementById('soundToggle');

// TODO: publicフォルダに bgm.mp3 などを配置したらコメントアウトを外して読み込む
// const bgm = new Sound("bgm", "./bgm.mp3", scene, null, { loop: true, autoplay: true });

soundBtn.addEventListener('click', () => {
    isSoundOn = !isSoundOn;
    if (isSoundOn) {
        soundBtn.innerText = '🔊 Sound ON';
        Engine.audioEngine.setGlobalVolume(1);
    } else {
        soundBtn.innerText = '🔇 Sound OFF';
        Engine.audioEngine.setGlobalVolume(0);
    }
});
