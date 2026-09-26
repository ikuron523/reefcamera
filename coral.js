import { SceneLoader, TransformNode, Vector3, Space } from '@babylonjs/core';

export function loadCorals(scene) {
    const numCorals = Math.floor(Math.random() * 3) + 10; // 10〜12個

    for (let i = 0; i < numCorals; i++) {
        // (x, z) は -60〜60 の位置
        const posX = -60 + Math.random() * 120;
        const posZ = -60 + Math.random() * 120;

        // y軸は -44〜-32
        const posY = -44 + Math.random() * 8;

        SceneLoader.ImportMeshAsync("", "./", "aurora_reef_-_coral.glb", scene).then((result) => {
            const rootNode = result.meshes[0];

            if (rootNode.rotationQuaternion) {
                rootNode.rotationQuaternion = null;
            }

            const wrapper = new TransformNode("auroraCoralWrapper_" + i, scene);
            rootNode.setParent(wrapper);

            // スケールは 1.0
            wrapper.scaling = new Vector3(15.0, 15.0, 15.0);
            wrapper.position = new Vector3(posX, posY, posZ);

            // 全て同じ向きにならないように、x, z 方向などに適当に回転させる
            // 水平にするため、y軸方向に-90度傾ける
            wrapper.rotation.y = -Math.PI / 2;

            // 水平の状態を崩さずに、地面（XZ平面）上で向きだけをランダムに回転させる
            // ワールドのY軸（真上）を基準に回転を追加します
            wrapper.rotate(Vector3.Up(), Math.random() * Math.PI * 2, Space.WORLD);
        });
    }

    // --- whispering_crown_-_coral.glb の設定 ---
    const numWhisperingCorals = Math.floor(Math.random() * 3) + 10; // 10〜12個

    for (let i = 0; i < numWhisperingCorals; i++) {
        // (x, z) は -120〜120 の範囲だが、-60〜60の範囲（中央）は除く
        let posX, posZ;
        do {
            posX = -120 + Math.random() * 240;
            posZ = -120 + Math.random() * 240;
        } while (posX > -60 && posX < 60 && posZ > -60 && posZ < 60);

        // y軸は -44〜-32
        const posY = -46 + Math.random() * 12;

        SceneLoader.ImportMeshAsync("", "./", "whispering_crown_-_coral.glb", scene).then((result) => {
            const rootNode = result.meshes[0];

            if (rootNode.rotationQuaternion) {
                rootNode.rotationQuaternion = null;
            }

            const wrapper = new TransformNode("whisperingCoralWrapper_" + i, scene);
            rootNode.setParent(wrapper);

            // スケールは 10
            wrapper.scaling = new Vector3(10.0, 10.0, 10.0);
            wrapper.position = new Vector3(posX, posY, posZ);

            // aurora_reef_-_coral.glb と同様に y軸方向に-90度傾けて水平にする
            wrapper.rotation.y = -Math.PI / 2;

            // 水平状態を維持しつつ、地面（x, z 平面）上でランダムな方向を向かせる
            wrapper.rotate(Vector3.Up(), Math.random() * Math.PI * 2, Space.WORLD);
        });
    }
}
