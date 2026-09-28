import { Engine, Scene } from '@babylonjs/core';
import '@babylonjs/loaders'; // .glbサポート用

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

// --- サウンドとUIの管理 ---
let isSoundOn = false;
const soundBtn = document.getElementById('soundToggle');

// ブラウザの自動再生制限対策のため、初期状態をミュート/OFFとする
soundBtn.innerText = '🔇 Sound OFF';

// BGMにはストリーミング再生ができ、メモリ消費も少なく動作が確実な HTML5 Audio を使用します
const bgm = new Audio("/reef_camera_bgm.mp3");
bgm.loop = true;

// デバッグ用
window.debugBGM = bgm;

soundBtn.addEventListener('click', () => {
    isSoundOn = !isSoundOn;
    if (isSoundOn) {
        soundBtn.innerText = '🔊 Sound ON';
        // 再生を開始。もしブラウザ制約等で失敗した場合はコンソールにエラーが出ます
        bgm.play().catch(err => {
            console.error("BGMの再生に失敗しました:", err);
        });
    } else {
        soundBtn.innerText = '🔇 Sound OFF';
        bgm.pause();
    }
});
