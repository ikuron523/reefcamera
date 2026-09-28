import { SceneLoader, TransformNode, Vector3, Space } from '@babylonjs/core';

export function loadCorals(scene) {
    const numCorals = Math.floor(Math.random() * 3) + 10;

    for (let i = 0; i < numCorals; i++) {
        // Random placement within the environment
        const posX = -60 + Math.random() * 120;
        const posZ = -60 + Math.random() * 120;

        // Random vertical placement near the seabed
        const posY = -44 + Math.random() * 8;

        SceneLoader.ImportMeshAsync("", "./", "aurora_reef_-_coral.glb", scene).then((result) => {
            const rootNode = result.meshes[0];

            if (rootNode.rotationQuaternion) {
                rootNode.rotationQuaternion = null;
            }

            const wrapper = new TransformNode("auroraCoralWrapper_" + i, scene);
            rootNode.setParent(wrapper);

            wrapper.scaling = new Vector3(15.0, 15.0, 15.0);
            wrapper.position = new Vector3(posX, posY, posZ);

            // Lay the coral flat horizontally by tilting it on the y-axis
            wrapper.rotation.y = -Math.PI / 2;

            // Apply a random rotation around the world's vertical axis (Up vector)
            // so they don't all face the same direction
            wrapper.rotate(Vector3.Up(), Math.random() * Math.PI * 2, Space.WORLD);
        });
    }

    // --- Setup for whispering_crown_-_coral.glb ---
    const numWhisperingCorals = Math.floor(Math.random() * 3) + 10;

    for (let i = 0; i < numWhisperingCorals; i++) {
        // Random placement avoiding the central area
        let posX, posZ;
        do {
            posX = -120 + Math.random() * 240;
            posZ = -120 + Math.random() * 240;
        } while (posX > -60 && posX < 60 && posZ > -60 && posZ < 60);

        const posY = -46 + Math.random() * 12;

        SceneLoader.ImportMeshAsync("", "./", "whispering_crown_-_coral.glb", scene).then((result) => {
            const rootNode = result.meshes[0];

            if (rootNode.rotationQuaternion) {
                rootNode.rotationQuaternion = null;
            }

            const wrapper = new TransformNode("whisperingCoralWrapper_" + i, scene);
            rootNode.setParent(wrapper);

            wrapper.scaling = new Vector3(10.0, 10.0, 10.0);
            wrapper.position = new Vector3(posX, posY, posZ);

            // Lay the coral flat horizontally
            wrapper.rotation.y = -Math.PI / 2;

            // Apply a random rotation around the world's vertical axis
            wrapper.rotate(Vector3.Up(), Math.random() * Math.PI * 2, Space.WORLD);
        });
    }
}
