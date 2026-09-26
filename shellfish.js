import { SceneLoader, TransformNode, Vector3 } from '@babylonjs/core';

export function loadShellfishes(scene) {
    // 6〜10個の貝を配置
    const numShells = Math.floor(Math.random() * 5) + 20;

    for (let i = 0; i < numShells; i++) {
        // (x, z) は -300〜300 の位置にランダム
        const posX = -200 + Math.random() * 400;
        const posZ = -200 + Math.random() * 400;

        // y軸は -33〜-30 でランダム (海底付近)
        const posY = -39 + Math.random() * 3;

        SceneLoader.ImportMeshAsync("", "./", "sea_snail_shell.glb", scene).then((result) => {
            const rootNode = result.meshes[0];

            // rotationQuaternionが設定されている場合はnullにしてrotationを使えるようにする
            if (rootNode.rotationQuaternion) {
                rootNode.rotationQuaternion = null;
            }

            const wrapper = new TransformNode("shellWrapper_" + i, scene);
            rootNode.setParent(wrapper);

            // スケールを 0.5 に設定
            wrapper.scaling = new Vector3(0.1, 0.1, 0.1);
            wrapper.position = new Vector3(posX, posY, posZ);

            // 360度（0 〜 2π）で x, y, z 軸方向にランダム回転
            wrapper.rotation.x = Math.random() * Math.PI * 2;
            wrapper.rotation.y = Math.random() * Math.PI * 2;
            wrapper.rotation.z = Math.random() * Math.PI * 2;
        });
    }

    // --- snail_shell.glb の設定 ---
    const numSnailShells = Math.floor(Math.random() * 3) + 10; // 3〜5個

    for (let i = 0; i < numSnailShells; i++) {
        // sea_snail_shell と同じ配置条件
        const posX = -200 + Math.random() * 400;
        const posZ = -200 + Math.random() * 400;
        const posY = -36 + Math.random() * 5;

        SceneLoader.ImportMeshAsync("", "./", "snail_shell.glb", scene).then((result) => {
            const rootNode = result.meshes[0];

            if (rootNode.rotationQuaternion) {
                rootNode.rotationQuaternion = null;
            }

            const wrapper = new TransformNode("snailShellWrapper_" + i, scene);
            rootNode.setParent(wrapper);

            // スケールを 0.1 に設定
            wrapper.scaling = new Vector3(0.3, 0.3, 0.3);
            wrapper.position = new Vector3(posX, posY, posZ);

            // 上向きの状態を維持するため、XZ平面上での向き（Y軸周りの回転）のみをランダムに設定
            wrapper.rotation.y = Math.random() * Math.PI * 2;

            // 「黒い円形の台座」を非表示にする処理
            // Sketchfab などのモデルでは、台座に "floor" という名前のメッシュやマテリアルが使われることが多いです
            result.meshes.forEach(mesh => {
                const meshName = mesh.name.toLowerCase();
                const matName = mesh.material ? mesh.material.name.toLowerCase() : "";

                if (meshName.includes("floor") || matName.includes("floor")) {
                    mesh.isVisible = false; // 台座を隠す
                }
            });
        });
    }

    // --- fluted_giant_clam_shell.glb の設定 ---
    const numClamShells = Math.floor(Math.random() * 3) + 3; // 3〜5個

    for (let i = 0; i < numClamShells; i++) {
        const posX = -150 + Math.random() * 300;
        const posZ = -150 + Math.random() * 300;
        const posY = -36 + Math.random() * 2;

        SceneLoader.ImportMeshAsync("", "./", "fluted_giant_clam_shell.glb", scene).then((result) => {
            const rootNode = result.meshes[0];

            if (rootNode.rotationQuaternion) {
                rootNode.rotationQuaternion = null;
            }

            const wrapper = new TransformNode("clamShellWrapper_" + i, scene);
            rootNode.setParent(wrapper);

            // スケールを 0.5 に設定
            wrapper.scaling = new Vector3(0.1, 0.1, 0.1);
            wrapper.position = new Vector3(posX, posY, posZ);

            // 直立しているモデルを地面に寝かせるため、まずはX軸方向に90度（Math.PI / 2）傾けます
            wrapper.rotation.x = Math.PI / 2;

            // その上で、指定通りx, z方向（BabylonではY軸が上なので、Y軸・Z軸など）に適当な回転を加えます
            wrapper.rotation.y = Math.random() * Math.PI * 2;
            wrapper.rotation.z = Math.random() * Math.PI * 2;
        });
    }

    // --- clam_shell.glb の設定 ---
    const numClamShells2 = Math.floor(Math.random() * 6) + 20; // 20〜25個

    for (let i = 0; i < numClamShells2; i++) {
        // sea_snail_shell.glb と同じ配置条件
        const posX = -200 + Math.random() * 400;
        const posZ = -200 + Math.random() * 400;
        const posY = -30 + Math.random() * 5;

        SceneLoader.ImportMeshAsync("", "./", "clam_shell.glb", scene).then((result) => {
            const rootNode = result.meshes[0];

            if (rootNode.rotationQuaternion) {
                rootNode.rotationQuaternion = null;
            }

            const wrapper = new TransformNode("clamShellWrapper2_" + i, scene);
            rootNode.setParent(wrapper);

            // スケールを 0.2 に設定
            wrapper.scaling = new Vector3(6.0, 6.0, 6.0);
            wrapper.position = new Vector3(posX, posY, posZ);

            // sea_snail_shell.glb と同様に x, y, z 軸方向にランダムに回転
            wrapper.rotation.x = Math.random() * Math.PI * 2;
            wrapper.rotation.y = Math.random() * Math.PI * 2;
            wrapper.rotation.z = Math.random() * Math.PI * 2;
        });
    }

    // --- cc0__japanese_baking_scallop_p._albicans.glb の設定 ---
    const numScallops = Math.floor(Math.random() * 6) + 15; // 15〜20個

    for (let i = 0; i < numScallops; i++) {
        // clam_shell.glb と同じ配置条件
        const posX = -200 + Math.random() * 400;
        const posZ = -200 + Math.random() * 400;
        const posY = -34 + Math.random() * 5;

        SceneLoader.ImportMeshAsync("", "./", "cc0__japanese_baking_scallop_p._albicans.glb", scene).then((result) => {
            const rootNode = result.meshes[0];

            if (rootNode.rotationQuaternion) {
                rootNode.rotationQuaternion = null;
            }

            const wrapper = new TransformNode("scallopWrapper_" + i, scene);
            rootNode.setParent(wrapper);

            // スケールは 1.0 に設定
            wrapper.scaling = new Vector3(0.5, 0.5, 0.5);
            wrapper.position = new Vector3(posX, posY, posZ);

            // デフォルトで殻が立っている状態なので、寝かせるために90度倒す
            // Babylon.jsはY-upなので、X軸周りに90度倒してからランダムに回転させます
            wrapper.rotation.x = Math.PI / 2;
            wrapper.rotation.y = Math.random() * Math.PI * 2;
            wrapper.rotation.z = Math.random() * Math.PI * 2;

            // 貝モデル以外の余計なデータ（キューブ等）を削除（非表示）
            result.meshes.forEach(mesh => {
                const meshName = mesh.name.toLowerCase();
                const matName = mesh.material ? mesh.material.name.toLowerCase() : "";

                // キューブのノード名（cube_2）やマテリアル名（material.001）を非表示にする
                if (meshName.includes("cube") || meshName.includes("box") || meshName.includes("empty") || matName.includes("material.001")) {
                    mesh.isVisible = false;
                }
            });
        });
    }
}
