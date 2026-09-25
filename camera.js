import { FreeCamera, Vector3 } from '@babylonjs/core';

export function setupCamera(scene) {
    const camera = new FreeCamera('camera1', new Vector3(0, -15, -10), scene);
    camera.setTarget(Vector3.Zero());

    // カメラをゆっくり自動で動かすロジック（半径10の円を描くように回転）
    let alpha = 0;
    scene.onBeforeRenderObservable.add(() => {
        alpha += 0.0005;

        // 半径10の円運動
        camera.position.x = Math.cos(alpha) * 100;
        camera.position.z = Math.sin(alpha) * 100;
        // 深さ-15を基準に、Y軸にも少し揺らして浮遊感を出す
        camera.position.y = -15 + Math.sin(alpha * 0.5) * 3;

        // 常に中心のY座標方向を向く
        const targetX = 0;
        const targetZ = 0;
        const targetY = camera.position.y;
        camera.setTarget(new Vector3(targetX, targetY, targetZ));

        // カメラ位置情報のUI更新
        const infoDiv = document.getElementById('cameraInfo');
        if (infoDiv) {
            infoDiv.innerText = `Cam Pos: x=${camera.position.x.toFixed(1)}, y=${camera.position.y.toFixed(1)}, z=${camera.position.z.toFixed(1)}\nTarget: x=${targetX.toFixed(1)}, y=${targetY.toFixed(1)}, z=${targetZ.toFixed(1)}`;
        }
    });

    return camera;
}
