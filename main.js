import { Engine, Scene, FreeCamera, Vector3, HemisphericLight, Color3, SceneLoader, Sound } from '@babylonjs/core';
import '@babylonjs/loaders'; // .glbサポート用

const canvas = document.getElementById('renderCanvas');
const engine = new Engine(canvas, true);

const createScene = function () {
    const scene = new Scene(engine);
    // 海中らしいフォグ（霧）の設定
    scene.fogMode = Scene.FOGMODE_EXP2;
    scene.fogColor = new Color3(0.0, 0.1, 0.3);
    scene.fogDensity = 0.03;
    scene.clearColor = new Color3(0.0, 0.1, 0.3);

    // カメラの設定 (自動で動かすためのベース)
    const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());
    // ユーザー操作は受け付けないので attachControl はしない

    // ライトの設定（海中を表現する青みがかった光）
    const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
    light.intensity = 0.8;
    light.diffuse = new Color3(0.6, 0.8, 1.0); 
    light.groundColor = new Color3(0.0, 0.1, 0.2);

    // TODO: ユーザーが public フォルダに fish.glb を配置したらコメントアウトを外して読み込む
    /*
    SceneLoader.ImportMeshAsync("", "./", "fish.glb", scene).then((result) => {
        const rootNode = result.meshes[0];
        rootNode.scaling = new Vector3(1, 1, 1);
        // アニメーションがある場合は自動再生されることが多いですが、手動制御も可能です
    });
    */

    // カメラをゆっくり自動で動かすロジック
    let alpha = 0;
    scene.onBeforeRenderObservable.add(() => {
        alpha += 0.001; // ゆったりとしたスピード
        camera.position.x = Math.cos(alpha) * 15;
        camera.position.z = Math.sin(alpha) * 15;
        camera.position.y = 5 + Math.sin(alpha * 1.5) * 2; // 上下にも少し揺らして浮遊感を出す
        camera.setTarget(Vector3.Zero()); // 常に中心を向く
    });

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
