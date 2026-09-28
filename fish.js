import { SceneLoader, Vector3, TransformNode } from '@babylonjs/core';

export function loadFishes(scene) {
    // --- school_of_fish ---
    const numSchools = Math.floor(Math.random() * 3) + 3;

    for (let i = 0; i < numSchools; i++) {
        let posX = 0;
        let posZ = 0;
        const posY = -40 + Math.random() * 20;

        if (i > 0) {
            const minDistance = i * -10;
            const maxDistance = i * 10;
            const distance = minDistance + Math.random() * (minDistance);
            const angle = Math.random() * Math.PI * 2;

            posX = Math.cos(angle) * distance;
            posZ = Math.sin(angle) * distance;
        }

        // 出現タイミングをずらすための遅延時間
        const delayMs = i * (500 + Math.random() * 1000);

        setTimeout(() => {
            SceneLoader.ImportMeshAsync("", "./", "school_of_fish.glb", scene).then((result) => {
                const rootNode = result.meshes[0];
                rootNode.scaling = new Vector3(0.8, 0.8, 0.8);
                rootNode.position = new Vector3(posX, posY, posZ);

                if (i > 0) {
                    if (rootNode.rotationQuaternion) {
                        rootNode.rotationQuaternion = null;
                    }
                    rootNode.rotation.y = Math.random() * Math.PI * 2;
                }

                if (result.animationGroups && result.animationGroups.length > 0) {
                    // アニメーション再生速度をランダム化
                    const animSpeed = 0.7 + Math.random() * 0.6;
                    result.animationGroups.forEach(group => {
                        group.speedRatio = animSpeed;
                        group.play(true);
                    });
                }
            });
        }, delayMs);
    }

    // --- school_of_herring ---
    const numHerrings = Math.floor(Math.random() * 3) + 2;

    for (let i = 0; i < numHerrings; i++) {
        const getCoord = () => {
            const val = 20 + Math.random() * 30;
            return Math.random() < 0.5 ? val : -val;
        };
        const posX = getCoord();
        const posZ = getCoord();
        const posY = -30 + Math.random() * 10;

        // ランダムに旋回方向を決める (1: 時計回り, -1: 反時計回り)
        //const direction = Math.random() < 0.5 ? 1 : -1;
        //const turnSpeed = (0.005 + Math.random() * 0.002) * direction;
        const turnSpeed = -(0.005 + Math.random() * 0.003);
        const moveSpeed = 0.04 + Math.random() * 0.01;

        SceneLoader.ImportMeshAsync("", "./", "school_of_herring.glb", scene).then((result) => {
            const rootNode = result.meshes[0];

            if (rootNode.rotationQuaternion) {
                rootNode.rotationQuaternion = null;
            }
            rootNode.rotation.y = -Math.PI / 2;

            const wrapper = new TransformNode("herringWrapper_" + i, scene);
            rootNode.setParent(wrapper);

            wrapper.scaling = new Vector3(50, 50, 50);
            wrapper.position = new Vector3(posX, posY, posZ);
            wrapper.rotation.y = Math.random() * Math.PI * 2;

            if (result.animationGroups && result.animationGroups.length > 0) {
                result.animationGroups.forEach(group => group.play(true));
            }

            // radiusは正の値になるように絶対値(Math.abs)を使う
            const radius = moveSpeed / Math.abs(turnSpeed);
            let currentAngle = Math.random() * Math.PI * 2;

            scene.onBeforeRenderObservable.add(() => {
                currentAngle += turnSpeed;
                wrapper.position.x = posX + Math.sin(currentAngle) * radius;
                wrapper.position.z = posZ + Math.cos(currentAngle) * radius;

                // 進行方向が変わると群れの向きも逆にする必要があるため、Math.sign(turnSpeed) で向きを調整
                wrapper.rotation.y = currentAngle + Math.sign(turnSpeed) * (Math.PI / 2);
            });
        });
    }

    // --- 単体の魚の設定 ---
    const numFishes = Math.floor(Math.random() * 3) + 3 // 3〜5匹

    for (let i = 0; i < numFishes; i++) {
        const posX = -15 + Math.random() * 30; // -15 〜 15
        const posZ = -15 + Math.random() * 30; // -15 〜 15
        const posY = -25 + Math.random() * 10; // -30 〜 -20

        // ランダムに旋回方向を決める (1: 時計回り, -1: 反時計回り)
        const direction = Math.random() < 0.5 ? 1 : -1;

        // 旋回半径を広げるために、旋回速度(turnSpeed)を小さくします。
        // （半径 = moveSpeed / turnSpeed となるため、ここを小さくするほど大きな円を描きます）
        const turnSpeed = (0.0003 + Math.random() * 0.001) * direction;
        const moveSpeed = 0.04 + Math.random() * 0.03; // 0.04前後

        // 出現タイミングをずらすための遅延時間 (0.5秒 〜 1.5秒の間隔で順次出現)
        const delayMs = i * (500 + Math.random() * 1000);

        setTimeout(() => {
            SceneLoader.ImportMeshAsync("", "./", "fishe.glb", scene).then((result) => {
                const rootNode = result.meshes[0];

                if (rootNode.rotationQuaternion) {
                    rootNode.rotationQuaternion = null;
                }
                rootNode.rotation.y = -Math.PI / 2;

                const wrapper = new TransformNode("fisheWrapper_" + i, scene);
                rootNode.setParent(wrapper);

                wrapper.scaling = new Vector3(35, 35, 35);
                wrapper.position = new Vector3(posX, posY, posZ);
                wrapper.rotation.y = Math.random() * Math.PI * 2;

                if (result.animationGroups && result.animationGroups.length > 0) {
                    // アニメーション再生速度をランダム化 (0.7倍 〜 1.3倍)
                    const animSpeed = 0.7 + Math.random() * 0.6;
                    result.animationGroups.forEach(group => {
                        group.speedRatio = animSpeed;
                        group.play(true);
                    });
                }

                // radiusは正の値になるように絶対値(Math.abs)を使う
                const radius = moveSpeed / Math.abs(turnSpeed);
                let currentAngle = Math.random() * Math.PI * 2;

                scene.onBeforeRenderObservable.add(() => {
                    currentAngle += turnSpeed;
                    wrapper.position.x = posX + Math.sin(currentAngle) * radius;
                    wrapper.position.z = posZ + Math.cos(currentAngle) * radius;

                    // 進行方向が変わると魚の頭の向きも逆にする必要があるため、Math.sign(turnSpeed) で向きを調整
                    wrapper.rotation.y = currentAngle + Math.sign(turnSpeed) * (Math.PI / 2);
                });
            });
        }, delayMs);
    }

    // --- 新しい単体の魚の設定 (animated_low_poly_fish.glb) ---
    const numSardines = Math.floor(Math.random() * 3) + 3; // 3〜5匹

    for (let i = 0; i < numSardines; i++) {
        // x^2 + z^2 = r^2 の円周上 (r = 80 〜 120) に配置
        const r = 100 + (Math.random() * 40 - 20); // 100 ± 20
        const theta = Math.random() * Math.PI * 2;
        const posX = r * Math.cos(theta);
        const posZ = r * Math.sin(theta);
        const posY = -20 + Math.random() * 10; // -20 〜 -10

        // ランダムに旋回方向を決める (1: 時計回り, -1: 反時計回り)
        const direction = Math.random() < 0.5 ? 1 : -1;
        const moveSpeed = 0.02 + Math.random() * 0.02; // 0.02 〜 0.04
        const turnSpeed = (0.002 + Math.random() * 0.003) * direction; // 同じ位置で旋回するためのturnSpeed

        // 出現時間を0.5〜1.5秒でランダムに変える
        const delayMs = 500 + Math.random() * 1000;

        setTimeout(() => {
            SceneLoader.ImportMeshAsync("", "./", "animated_low_poly_fish.glb", scene).then((result) => {
                const rootNode = result.meshes[0];

                if (rootNode.rotationQuaternion) {
                    rootNode.rotationQuaternion = null;
                }
                // モデルがデフォルトで逆を向いているため、180度（+Math.PI/2）反転させます
                rootNode.rotation.y = Math.PI / 2;

                const wrapper = new TransformNode("sardineWrapper_" + i, scene);
                rootNode.setParent(wrapper);

                // スケールは仮で 1 に設定しています。
                // モデルによって大きすぎる・小さすぎる場合は、ここの数値を調整してください。
                wrapper.scaling = new Vector3(6, 6, 6);
                wrapper.position = new Vector3(posX, posY, posZ);
                wrapper.rotation.y = Math.random() * Math.PI * 2;

                if (result.animationGroups && result.animationGroups.length > 0) {
                    // アニメーション再生速度をランダム化
                    const animSpeed = 0.7 + Math.random() * 0.6;
                    result.animationGroups.forEach(group => {
                        group.speedRatio = animSpeed;
                        group.play(true);
                    });
                }

                // radiusは正の値になるように絶対値(Math.abs)を使う
                const radius = moveSpeed / Math.abs(turnSpeed);
                let currentAngle = Math.random() * Math.PI * 2;

                scene.onBeforeRenderObservable.add(() => {
                    currentAngle += turnSpeed;
                    wrapper.position.x = posX + Math.sin(currentAngle) * radius;
                    wrapper.position.z = posZ + Math.cos(currentAngle) * radius;

                    // 進行方向が変わると魚の頭の向きも逆にする必要があるため、Math.sign(turnSpeed) で向きを調整
                    wrapper.rotation.y = currentAngle + Math.sign(turnSpeed) * (Math.PI / 2);
                });
            });
        }, delayMs);
    }

    // -- 新しい魚の設定（blue_tang_fish_paracanthurus_hepatus.glb） ---
    const numBlueTangs = Math.floor(Math.random() * 3) + 3; // 3〜5匹

    for (let i = 0; i < numBlueTangs; i++) {
        const radius = 60 + Math.random() * 20; // 半径 70〜90
        const posY = -15 + Math.random() * 10; // 深さの設定 (-15〜-5)

        const direction = Math.random() < 0.5 ? 1 : -1; // ランダムな旋回方向
        const moveSpeed = 0.08 + Math.random() * 0.04; // 0.08〜0.12 (カメラより速く動くように修正)
        const turnSpeed = (moveSpeed / radius) * direction; // 半径に合わせてバランスをとる

        const delayMs = 500 + Math.random() * 1000; // 0.5〜1.5秒でランダム

        setTimeout(() => {
            SceneLoader.ImportMeshAsync("", "./", "blue_tang_fish_paracanthurus_hepatus.glb", scene).then((result) => {
                const rootNode = result.meshes[0];

                if (rootNode.rotationQuaternion) {
                    rootNode.rotationQuaternion = null;
                }

                // 魚が真横を向いてしまうため、向きを0に調整（もし後ろ向きに泳ぐ場合は Math.PI に変更してください）
                rootNode.rotation.y = Math.PI;

                const wrapper = new TransformNode("blueTangWrapper_" + i, scene);
                rootNode.setParent(wrapper);

                wrapper.scaling = new Vector3(0.2, 0.2, 0.2); // スケールを 0.2 に設定
                wrapper.position.y = posY;

                if (result.animationGroups && result.animationGroups.length > 0) {
                    const animSpeed = 0.8 + Math.random() * 0.4; // アニメーション速度をランダムに
                    result.animationGroups.forEach(group => {
                        group.speedRatio = animSpeed;
                        group.play(true);
                    });
                }

                let currentAngle = Math.random() * Math.PI * 2; // 初期角度

                scene.onBeforeRenderObservable.add(() => {
                    currentAngle += turnSpeed;

                    // 中心 (0, 0) からの旋回
                    wrapper.position.x = Math.sin(currentAngle) * radius;
                    wrapper.position.z = Math.cos(currentAngle) * radius;

                    // 進行方向に向ける
                    wrapper.rotation.y = currentAngle + Math.sign(turnSpeed) * (Math.PI / 2);
                });
            });
        }, delayMs);
    }

    // --- サメの設定 (great_white_shark) ---
    const numSharks = Math.floor(Math.random() * 3) + 1; // 1〜3匹

    const spawnShark = () => {
        // 中心の位置をマップ端 (半径 230〜250 の円周上) に配置
        const centerR = 230 + Math.random() * 20;
        const centerTheta = Math.random() * Math.PI * 2;
        const posX = centerR * Math.cos(centerTheta);
        const posZ = centerR * Math.sin(centerTheta);
        const posY = -30 + Math.random() * 20; // -25 〜 -10 (サメごとにばらばら)

        // 旋回半径 (中心から原点までの距離 ± 20)
        // これにより、マップ端を起点としてカメラ中心(原点付近)を通る大きな円になります
        const radius = centerR + (Math.random() * 40 - 20);

        const direction = Math.random() < 0.5 ? 1 : -1;
        const moveSpeed = 0.3; // サメなので速め

        // moveSpeed と半径から turnSpeed を逆算してつり合いをとる
        const turnSpeed = (moveSpeed / radius) * direction;

        // 初回のみ適当なディレイ
        const delayMs = Math.random() * 2000;

        setTimeout(() => {
            SceneLoader.ImportMeshAsync("", "./", "great_white_shark.glb", scene).then((result) => {
                const rootNode = result.meshes[0];

                if (rootNode.rotationQuaternion) {
                    rootNode.rotationQuaternion = null;
                }
                // モデルが真横を向いてしまう場合は、モデルの基準角度を 90度ずらす必要があります。
                // 0 を設定して正面を向けます（もし後ろ向きになった場合は Math.PI に変更してください）
                rootNode.rotation.y = Math.PI;

                const wrapper = new TransformNode("sharkWrapper_" + Math.random(), scene);
                rootNode.setParent(wrapper);

                // スケールはご指定の通り5に設定
                wrapper.scaling = new Vector3(12, 12, 12);
                wrapper.position = new Vector3(posX, posY, posZ);
                wrapper.rotation.y = Math.random() * Math.PI * 2;

                if (result.animationGroups && result.animationGroups.length > 0) {
                    // アニメーション再生速度をランダム化
                    const animSpeed = 0.8 + Math.random() * 0.4;
                    result.animationGroups.forEach(group => {
                        group.speedRatio = animSpeed;
                        group.play(true);
                    });
                }

                // 出現/消去がカメラから見えないよう、最も遠い位置からスタートさせる
                let currentAngle = Math.PI / 2 - centerTheta;
                const initialAngle = currentAngle;

                const updateShark = () => {
                    currentAngle += turnSpeed;
                    wrapper.position.x = posX + Math.sin(currentAngle) * radius;
                    wrapper.position.z = posZ + Math.cos(currentAngle) * radius;
                    wrapper.rotation.y = currentAngle + Math.sign(turnSpeed) * (Math.PI / 2);

                    // 1周(2π)回りきったら再生成
                    if (Math.abs(currentAngle - initialAngle) >= Math.PI * 2) {

                        // リスナーを解除し、モデルを破棄
                        scene.onBeforeRenderObservable.removeCallback(updateShark);
                        rootNode.dispose();
                        wrapper.dispose();

                        // すぐに新しいサメを生成して補充する
                        spawnShark();
                    }
                };

                scene.onBeforeRenderObservable.add(updateShark);
            });
        }, delayMs);
    };

    // 初期のサメを生成
    for (let i = 0; i < numSharks; i++) {
        spawnShark();
    }

    // --- エイの設定 (manta_ray_birostris_animated) ---
    const spawnManta = () => {
        // 中心の位置をマップ端 (半径 230〜250 の円周上) に配置
        const centerR = 230 + Math.random() * 20;
        const centerTheta = Math.random() * Math.PI * 2;
        const posX = centerR * Math.cos(centerTheta);
        const posZ = centerR * Math.sin(centerTheta);

        // エイは海面近くを泳ぐ (y座標 -5〜0)
        const posY = -4 + Math.random() * 5;

        // 旋回半径 (中心から原点までの距離 ± 20)
        const radius = centerR + (Math.random() * 40 - 20);

        const direction = Math.random() < 0.5 ? 1 : -1;
        const moveSpeed = 0.1; // サメと同じ
        const turnSpeed = (moveSpeed / radius) * direction;

        const delayMs = Math.random() * 2000;

        setTimeout(() => {
            SceneLoader.ImportMeshAsync("", "./", "manta_ray_birostris_animated.glb", scene).then((result) => {
                const rootNode = result.meshes[0];

                if (rootNode.rotationQuaternion) {
                    rootNode.rotationQuaternion = null;
                }

                // エイのモデルの向きに合わせて調整してください (とりあえず0にしています)
                // もしカニ歩きになる場合は Math.PI/2 や -Math.PI/2 などに変更してください
                rootNode.rotation.y = Math.PI;

                const wrapper = new TransformNode("mantaWrapper_" + Math.random(), scene);
                rootNode.setParent(wrapper);

                // スケールは仮で 2 に設定
                wrapper.scaling = new Vector3(2, 2, 2);
                wrapper.position = new Vector3(posX, posY, posZ);
                wrapper.rotation.y = Math.random() * Math.PI * 2;

                if (result.animationGroups && result.animationGroups.length > 0) {
                    const animSpeed = 0.8 + Math.random() * 0.4;
                    result.animationGroups.forEach(group => {
                        group.speedRatio = animSpeed;
                        group.play(true);
                    });
                }

                // 出現/消去がカメラから見えないよう、最も遠い位置からスタートさせる
                let currentAngle = Math.PI / 2 - centerTheta;
                const initialAngle = currentAngle;

                const updateManta = () => {
                    currentAngle += turnSpeed;
                    wrapper.position.x = posX + Math.sin(currentAngle) * radius;
                    wrapper.position.z = posZ + Math.cos(currentAngle) * radius;
                    wrapper.rotation.y = currentAngle + Math.sign(turnSpeed) * (Math.PI / 2);

                    // 1周(2π)回りきったら再生成
                    if (Math.abs(currentAngle - initialAngle) >= Math.PI * 2) {

                        scene.onBeforeRenderObservable.removeCallback(updateManta);
                        rootNode.dispose();
                        wrapper.dispose();

                        // すぐに新しいエイを生成
                        spawnManta();
                    }
                };

                scene.onBeforeRenderObservable.add(updateManta);
            });
        }, delayMs);
    };

    // 常に1匹
    spawnManta();

    // --- イルカの群れの設定 (model_101a_-_adult_common_dolphin) ---
    const spawnDolphinPack = () => {
        const numDolphins = Math.floor(Math.random() * 2) + 2; // 2〜3頭

        // 群れ全体の基本パラメータ (リーダーを基準とする)
        const centerR = 230 + Math.random() * 20;
        const centerTheta = Math.random() * Math.PI * 2;
        const basePosX = centerR * Math.cos(centerTheta);
        const basePosZ = centerR * Math.sin(centerTheta);
        const basePosY = -10 + Math.random() * 5; // -10 〜 -5

        const baseRadius = centerR + (Math.random() * 40 - 20);

        const direction = Math.random() < 0.5 ? 1 : -1;
        const moveSpeed = 0.4; // イルカなのでかなり速め
        const turnSpeed = (moveSpeed / baseRadius) * direction; // 全頭で同じ角速度を共有し、群れを維持する

        // 群れ全員が同じスタート角度(カメラから最も遠い場所)を持つ
        const initialAngle = Math.PI / 2 - centerTheta;

        // 全頭が画面外に出たかをカウント
        let outOfBoundsCount = 0;

        for (let i = 0; i < numDolphins; i++) {
            // 各イルカのばらつき (リーダーは0、他は±5)
            const offsetX = i === 0 ? 0 : (Math.random() * 10 - 5);
            const offsetZ = i === 0 ? 0 : (Math.random() * 10 - 5);
            const offsetY = i === 0 ? 0 : (Math.random() * 10 - 5);
            const offsetRadius = i === 0 ? 0 : (Math.random() * 10 - 5);

            const posX = basePosX + offsetX;
            const posZ = basePosZ + offsetZ;
            const posY = basePosY + offsetY;
            const radius = baseRadius + offsetRadius;

            // 出現タイミングを0.5〜1秒(500〜1000ms)ずつ遅らせることで、
            // 同じスタート角度(initialAngle)でも重ならずに前後に列を作る
            const delayMs = i * (1500 + Math.random() * 1500);

            setTimeout(() => {
                SceneLoader.ImportMeshAsync("", "./", "model_101a_-_adult_common_dolphin.glb", scene).then((result) => {
                    const rootNode = result.meshes[0];

                    if (rootNode.rotationQuaternion) {
                        rootNode.rotationQuaternion = null;
                    }
                    // モデルの向きに合わせて調整 (とりあえず0)
                    // カニ歩きや後ろ向きになる場合は Math.PI/2 や Math.PI などに調整してください
                    rootNode.rotation.y = Math.PI;

                    const wrapper = new TransformNode("dolphinWrapper_" + Math.random(), scene);
                    rootNode.setParent(wrapper);

                    // スケールは 14 に設定
                    wrapper.scaling = new Vector3(14, 14, 14);
                    wrapper.position = new Vector3(posX, posY, posZ);
                    wrapper.rotation.y = Math.random() * Math.PI * 2;

                    if (result.animationGroups && result.animationGroups.length > 0) {
                        // アニメーション速度もイルカごとに少しばらつかせる
                        const animSpeed = 0.9 + Math.random() * 0.2;
                        result.animationGroups.forEach(group => {
                            group.speedRatio = animSpeed;
                            group.play(true);
                        });
                    }

                    // 全頭で共通のスタート角度を使う
                    let currentAngle = initialAngle;

                    const updateDolphin = () => {
                        currentAngle += turnSpeed;
                        wrapper.position.x = posX + Math.sin(currentAngle) * radius;
                        wrapper.position.z = posZ + Math.cos(currentAngle) * radius;
                        wrapper.rotation.y = currentAngle + Math.sign(turnSpeed) * (Math.PI / 2);

                        // 「1周(2π)回りきった時点」で寿命として破棄し、新しい群れを生成させます
                        if (Math.abs(currentAngle - initialAngle) >= Math.PI * 2) {

                            scene.onBeforeRenderObservable.removeCallback(updateDolphin);
                            rootNode.dispose();
                            wrapper.dispose();

                            outOfBoundsCount++;
                            // 群れの全頭が画面外に出たら、新しい群れを生成する
                            if (outOfBoundsCount === numDolphins) {
                                spawnDolphinPack();
                            }
                        }
                    };

                    scene.onBeforeRenderObservable.add(updateDolphin);
                });
            }, delayMs);
        }
    };

    // 初期のイルカの群れを生成
    spawnDolphinPack();
}
