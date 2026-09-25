import { SceneLoader, Vector3, TransformNode } from '@babylonjs/core';

export function loadFishes(scene) {
    // --- school_of_fish ---
    const numSchools = Math.floor(Math.random() * 3) + 3;

    for (let i = 0; i < numSchools; i++) {
        let posX = 0;
        let posZ = 0;
        const posY = -30 + Math.random() * 15;

        if (i > 0) {
            const minDistance = i * 10;
            const maxDistance = minDistance + 10;
            const distance = minDistance + Math.random() * (maxDistance - minDistance);
            const angle = Math.random() * Math.PI * 2;

            posX = Math.cos(angle) * distance;
            posZ = Math.sin(angle) * distance;
        }

        SceneLoader.ImportMeshAsync("", "./", "school_of_fish.glb", scene).then((result) => {
            const rootNode = result.meshes[0];
            rootNode.scaling = new Vector3(1, 1, 1);
            rootNode.position = new Vector3(posX, posY, posZ);

            if (i > 0) {
                if (rootNode.rotationQuaternion) {
                    rootNode.rotationQuaternion = null;
                }
                rootNode.rotation.y = Math.random() * Math.PI * 2;
            }

            if (result.animationGroups && result.animationGroups.length > 0) {
                result.animationGroups.forEach(group => group.play(true));
            }
        });
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
        const posY = -20 + Math.random() * 10;

        const turnSpeed = 0.005 + Math.random() * 0.002;
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

            const radius = moveSpeed / turnSpeed;
            let currentAngle = Math.random() * Math.PI * 2;

            scene.onBeforeRenderObservable.add(() => {
                currentAngle += turnSpeed;
                wrapper.position.x = posX + Math.sin(currentAngle) * radius;
                wrapper.position.z = posZ + Math.cos(currentAngle) * radius;
                wrapper.rotation.y = currentAngle + Math.PI / 2;
            });
        });
    }
}
