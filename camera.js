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

        const targetX = 0;
        const targetZ = 0;
        
        // Y軸のベース位置（-15）からの変位
        const yOffset = Math.sin(alpha * 0.5) * 3;
        
        // y軸位置（変位）に比例して視線をわずかに上下に傾ける
        // 高い位置（yOffsetがプラス）にいるときは少し上を、低い位置にいるときは少し下を向く
        // 水面や地面ばかりが映らないよう、係数（1.5）でわずかな傾きに抑えています
        const tilt = yOffset * 1.5; 
        const targetY = camera.position.y + tilt;
        camera.setTarget(new Vector3(targetX, targetY, targetZ));

        // カメラ位置情報のUI更新
        const infoDiv = document.getElementById('cameraInfo');
        if (infoDiv) {
            infoDiv.innerText = `Cam Pos: x=${camera.position.x.toFixed(1)}, y=${camera.position.y.toFixed(1)}, z=${camera.position.z.toFixed(1)}\nTarget: x=${targetX.toFixed(1)}, y=${targetY.toFixed(1)}, z=${targetZ.toFixed(1)}`;
        }
    });

    return camera;
}
