import { Color3, Vector3, HemisphericLight, PointLight, MeshBuilder, StandardMaterial, VertexBuffer, Scene } from '@babylonjs/core';

// --- パーリンノイズ風の地形生成用関数（Value Noise + fBm） ---
const noiseTable = Array.from({ length: 256 }, () => Math.random());
function smoothNoise2D(x, y) {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const xf = x - xi;
    const yf = y - yi;
    const fade = t => t * t * (3 - 2 * t); // 滑らかな補間
    const u = fade(xf);
    const v = fade(yf);
    // マイナスの座標でも正しく配列を参照できるように調整
    const hash = (i, j) => noiseTable[(Math.abs(i) + Math.abs(j) * 57) % 256];
    const aa = hash(xi, yi);
    const ba = hash(xi + 1, yi);
    const ab = hash(xi, yi + 1);
    const bb = hash(xi + 1, yi + 1);
    const x1 = aa + u * (ba - aa);
    const x2 = ab + u * (bb - ab);
    return x1 + v * (x2 - x1);
}

function fbm(x, y, octaves = 4) {
    let total = 0, frequency = 1, amplitude = 40, maxValue = 0;
    for (let i = 0; i < octaves; i++) {
        total += smoothNoise2D(x * frequency, y * frequency) * amplitude;
        maxValue += amplitude;
        amplitude *= 0.5;
        frequency *= 2.0;
    }
    return total / maxValue; // 0.0 〜 1.0
}

export function setupEnvironment(scene) {
    // 明るいサンゴ礁（リーフ）らしいフォグ（霧）の設定
    scene.fogMode = Scene.FOGMODE_LINEAR;
    scene.fogColor = new Color3(0.2, 0.6, 0.8);
    scene.fogStart = 180.0;
    scene.fogEnd = 380.0;
    scene.clearColor = new Color3(0.2, 0.6, 0.8);

    // --- 光源の設定 ---
    const hemiLight = new HemisphericLight('hemiLight', new Vector3(0, 1, 0), scene);
    hemiLight.intensity = 1.3;
    hemiLight.diffuse = new Color3(0.7, 0.9, 1.0);
    hemiLight.groundColor = new Color3(0.0, 0.0, 0.0);

    const sunLight = new PointLight('sunLight', new Vector3(30, 15, 30), scene);
    sunLight.intensity = 0.8;
    sunLight.diffuse = new Color3(1.0, 1.0, 0.9);
    sunLight.specular = new Color3(1.0, 1.0, 1.0);
    sunLight.groundColor = new Color3(0.0, 0.0, 0.0);

    // --- 海底の設定 ---
    const ground = MeshBuilder.CreateGround('ground', { width: 500, height: 500, subdivisions: 80 }, scene);
    ground.position.y = -35;

    const groundPositions = ground.getVerticesData(VertexBuffer.PositionKind);
    if (groundPositions) {
        for (let p = 0; p < groundPositions.length; p += 3) {
            const x = groundPositions[p];
            const z = groundPositions[p + 2];
            const noiseVal = fbm(x * 0.015, z * 0.015, 4);
            const height = (noiseVal - 0.5) * 15.0;
            groundPositions[p + 1] = height;
        }
        ground.updateVerticesData(VertexBuffer.PositionKind, groundPositions);
        ground.createNormals(false);
    }

    const groundMat = new StandardMaterial('groundMat', scene);
    groundMat.diffuseColor = new Color3(0.3, 0.3, 0.3);
    ground.material = groundMat;

    // --- 水面の設定 ---
    const water = MeshBuilder.CreateGround('water', { width: 500, height: 500, subdivisions: 64 }, scene);
    water.position.y = 0;
    const waterMat = new StandardMaterial('waterMat', scene);
    waterMat.diffuseColor = new Color3(0.1, 0.3, 0.5);
    waterMat.alpha = 0.5;
    waterMat.backFaceCulling = false;
    water.material = waterMat;

    let waveTime = 0;
    scene.onBeforeRenderObservable.add(() => {
        waveTime += 0.05;
        const positions = water.getVerticesData(VertexBuffer.PositionKind);
        if (!positions) return;

        for (let p = 0; p < positions.length; p += 3) {
            const x = positions[p];
            positions[p + 1] = Math.sin(x * 0.15 + waveTime) * 0.5;
        }
        water.updateVerticesData(VertexBuffer.PositionKind, positions);
        water.createNormals(false);
    });
}
