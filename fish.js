import { SceneLoader, Vector3, TransformNode } from '@babylonjs/core';

export function loadFishes(scene) {
    // --- Setup for school_of_fish ---
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

        // Stagger the spawn timing
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
                    // Randomize animation playback speed
                    const animSpeed = 0.7 + Math.random() * 0.6;
                    result.animationGroups.forEach(group => {
                        group.speedRatio = animSpeed;
                        group.play(true);
                    });
                }
            });
        }, delayMs);
    }

    // --- Setup for school_of_herring ---
    const numHerrings = Math.floor(Math.random() * 3) + 2;

    for (let i = 0; i < numHerrings; i++) {
        const getCoord = () => {
            const val = 20 + Math.random() * 30;
            return Math.random() < 0.5 ? val : -val;
        };
        const posX = getCoord();
        const posZ = getCoord();
        const posY = -30 + Math.random() * 10;

        // Randomize turn direction
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

            // Ensure the radius is positive
            const radius = moveSpeed / Math.abs(turnSpeed);
            let currentAngle = Math.random() * Math.PI * 2;

            scene.onBeforeRenderObservable.add(() => {
                currentAngle += turnSpeed;
                wrapper.position.x = posX + Math.sin(currentAngle) * radius;
                wrapper.position.z = posZ + Math.cos(currentAngle) * radius;

                // Adjust facing direction based on movement angle
                wrapper.rotation.y = currentAngle + Math.sign(turnSpeed) * (Math.PI / 2);
            });
        });
    }

    // --- Setup for individual fish (fishe.glb) ---
    const numFishes = Math.floor(Math.random() * 3) + 3;

    for (let i = 0; i < numFishes; i++) {
        const posX = -15 + Math.random() * 30;
        const posZ = -15 + Math.random() * 30;
        const posY = -25 + Math.random() * 10;

        // Randomize rotation direction (1: clockwise, -1: counterclockwise)
        const direction = Math.random() < 0.5 ? 1 : -1;

        // Use a low turn speed to create a wide turning radius
        const turnSpeed = (0.0003 + Math.random() * 0.001) * direction;
        const moveSpeed = 0.04 + Math.random() * 0.03;

        // Stagger the spawn timing
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
                    // Randomize animation playback speed
                    const animSpeed = 0.7 + Math.random() * 0.6;
                    result.animationGroups.forEach(group => {
                        group.speedRatio = animSpeed;
                        group.play(true);
                    });
                }

                const radius = moveSpeed / Math.abs(turnSpeed);
                let currentAngle = Math.random() * Math.PI * 2;

                scene.onBeforeRenderObservable.add(() => {
                    currentAngle += turnSpeed;
                    wrapper.position.x = posX + Math.sin(currentAngle) * radius;
                    wrapper.position.z = posZ + Math.cos(currentAngle) * radius;

                    // Adjust facing direction
                    wrapper.rotation.y = currentAngle + Math.sign(turnSpeed) * (Math.PI / 2);
                });
            });
        }, delayMs);
    }

    // --- Setup for animated_low_poly_fish.glb ---
    const numSardines = Math.floor(Math.random() * 3) + 3;

    for (let i = 0; i < numSardines; i++) {
        // Place along a circular perimeter
        const r = 100 + (Math.random() * 40 - 20);
        const theta = Math.random() * Math.PI * 2;
        const posX = r * Math.cos(theta);
        const posZ = r * Math.sin(theta);
        const posY = -20 + Math.random() * 10;

        const direction = Math.random() < 0.5 ? 1 : -1;
        const moveSpeed = 0.02 + Math.random() * 0.02;
        const turnSpeed = (0.002 + Math.random() * 0.003) * direction;

        const delayMs = 500 + Math.random() * 1000;

        setTimeout(() => {
            SceneLoader.ImportMeshAsync("", "./", "animated_low_poly_fish.glb", scene).then((result) => {
                const rootNode = result.meshes[0];

                if (rootNode.rotationQuaternion) {
                    rootNode.rotationQuaternion = null;
                }
                // Flip by 180 degrees to correct the default orientation
                rootNode.rotation.y = Math.PI / 2;

                const wrapper = new TransformNode("sardineWrapper_" + i, scene);
                rootNode.setParent(wrapper);

                wrapper.scaling = new Vector3(6, 6, 6);
                wrapper.position = new Vector3(posX, posY, posZ);
                wrapper.rotation.y = Math.random() * Math.PI * 2;

                if (result.animationGroups && result.animationGroups.length > 0) {
                    const animSpeed = 0.7 + Math.random() * 0.6;
                    result.animationGroups.forEach(group => {
                        group.speedRatio = animSpeed;
                        group.play(true);
                    });
                }

                const radius = moveSpeed / Math.abs(turnSpeed);
                let currentAngle = Math.random() * Math.PI * 2;

                scene.onBeforeRenderObservable.add(() => {
                    currentAngle += turnSpeed;
                    wrapper.position.x = posX + Math.sin(currentAngle) * radius;
                    wrapper.position.z = posZ + Math.cos(currentAngle) * radius;

                    wrapper.rotation.y = currentAngle + Math.sign(turnSpeed) * (Math.PI / 2);
                });
            });
        }, delayMs);
    }

    // -- Setup for blue_tang_fish_paracanthurus_hepatus.glb ---
    const numBlueTangs = Math.floor(Math.random() * 3) + 3;

    for (let i = 0; i < numBlueTangs; i++) {
        const radius = 60 + Math.random() * 20;
        const posY = -15 + Math.random() * 10;

        const direction = Math.random() < 0.5 ? 1 : -1;
        const moveSpeed = 0.08 + Math.random() * 0.04;
        const turnSpeed = (moveSpeed / radius) * direction;

        const delayMs = 500 + Math.random() * 1000;

        setTimeout(() => {
            SceneLoader.ImportMeshAsync("", "./", "blue_tang_fish_paracanthurus_hepatus.glb", scene).then((result) => {
                const rootNode = result.meshes[0];

                if (rootNode.rotationQuaternion) {
                    rootNode.rotationQuaternion = null;
                }

                // Adjust default orientation
                rootNode.rotation.y = Math.PI;

                const wrapper = new TransformNode("blueTangWrapper_" + i, scene);
                rootNode.setParent(wrapper);

                wrapper.scaling = new Vector3(0.2, 0.2, 0.2);
                wrapper.position.y = posY;

                if (result.animationGroups && result.animationGroups.length > 0) {
                    const animSpeed = 0.8 + Math.random() * 0.4;
                    result.animationGroups.forEach(group => {
                        group.speedRatio = animSpeed;
                        group.play(true);
                    });
                }

                let currentAngle = Math.random() * Math.PI * 2;

                scene.onBeforeRenderObservable.add(() => {
                    currentAngle += turnSpeed;

                    // Orbit around the center
                    wrapper.position.x = Math.sin(currentAngle) * radius;
                    wrapper.position.z = Math.cos(currentAngle) * radius;

                    // Point in the direction of movement
                    wrapper.rotation.y = currentAngle + Math.sign(turnSpeed) * (Math.PI / 2);
                });
            });
        }, delayMs);
    }

    // --- Setup for great_white_shark ---
    const numSharks = Math.floor(Math.random() * 3) + 1;

    const spawnShark = () => {
        // Position along the outer perimeter
        const centerR = 230 + Math.random() * 20;
        const centerTheta = Math.random() * Math.PI * 2;
        const posX = centerR * Math.cos(centerTheta);
        const posZ = centerR * Math.sin(centerTheta);
        const posY = -30 + Math.random() * 20;

        // Turning radius ensures it passes through the center of the map
        const radius = centerR + (Math.random() * 40 - 20);

        const direction = Math.random() < 0.5 ? 1 : -1;
        const moveSpeed = 0.3; // Fast movement

        const turnSpeed = (moveSpeed / radius) * direction;
        const delayMs = Math.random() * 2000;

        setTimeout(() => {
            SceneLoader.ImportMeshAsync("", "./", "great_white_shark.glb", scene).then((result) => {
                const rootNode = result.meshes[0];

                if (rootNode.rotationQuaternion) {
                    rootNode.rotationQuaternion = null;
                }
                
                // Adjust default orientation
                rootNode.rotation.y = Math.PI;

                const wrapper = new TransformNode("sharkWrapper_" + Math.random(), scene);
                rootNode.setParent(wrapper);

                wrapper.scaling = new Vector3(12, 12, 12);
                wrapper.position = new Vector3(posX, posY, posZ);
                wrapper.rotation.y = Math.random() * Math.PI * 2;

                if (result.animationGroups && result.animationGroups.length > 0) {
                    const animSpeed = 0.8 + Math.random() * 0.4;
                    result.animationGroups.forEach(group => {
                        group.speedRatio = animSpeed;
                        group.play(true);
                    });
                }

                // Start at the farthest point out of view
                let currentAngle = Math.PI / 2 - centerTheta;
                const initialAngle = currentAngle;

                const updateShark = () => {
                    currentAngle += turnSpeed;
                    wrapper.position.x = posX + Math.sin(currentAngle) * radius;
                    wrapper.position.z = posZ + Math.cos(currentAngle) * radius;
                    wrapper.rotation.y = currentAngle + Math.sign(turnSpeed) * (Math.PI / 2);

                    // Despawn and recreate when one full orbit is completed
                    if (Math.abs(currentAngle - initialAngle) >= Math.PI * 2) {
                        scene.onBeforeRenderObservable.removeCallback(updateShark);
                        rootNode.dispose();
                        wrapper.dispose();
                        spawnShark();
                    }
                };

                scene.onBeforeRenderObservable.add(updateShark);
            });
        }, delayMs);
    };

    for (let i = 0; i < numSharks; i++) {
        spawnShark();
    }

    // --- Setup for manta_ray_birostris_animated ---
    const spawnManta = () => {
        const centerR = 230 + Math.random() * 20;
        const centerTheta = Math.random() * Math.PI * 2;
        const posX = centerR * Math.cos(centerTheta);
        const posZ = centerR * Math.sin(centerTheta);

        // Mantas swim near the surface
        const posY = -4 + Math.random() * 5;

        const radius = centerR + (Math.random() * 40 - 20);
        const direction = Math.random() < 0.5 ? 1 : -1;
        const moveSpeed = 0.1;
        const turnSpeed = (moveSpeed / radius) * direction;

        const delayMs = Math.random() * 2000;

        setTimeout(() => {
            SceneLoader.ImportMeshAsync("", "./", "manta_ray_birostris_animated.glb", scene).then((result) => {
                const rootNode = result.meshes[0];

                if (rootNode.rotationQuaternion) {
                    rootNode.rotationQuaternion = null;
                }

                rootNode.rotation.y = Math.PI;

                const wrapper = new TransformNode("mantaWrapper_" + Math.random(), scene);
                rootNode.setParent(wrapper);

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

                let currentAngle = Math.PI / 2 - centerTheta;
                const initialAngle = currentAngle;

                const updateManta = () => {
                    currentAngle += turnSpeed;
                    wrapper.position.x = posX + Math.sin(currentAngle) * radius;
                    wrapper.position.z = posZ + Math.cos(currentAngle) * radius;
                    wrapper.rotation.y = currentAngle + Math.sign(turnSpeed) * (Math.PI / 2);

                    if (Math.abs(currentAngle - initialAngle) >= Math.PI * 2) {
                        scene.onBeforeRenderObservable.removeCallback(updateManta);
                        rootNode.dispose();
                        wrapper.dispose();
                        spawnManta();
                    }
                };

                scene.onBeforeRenderObservable.add(updateManta);
            });
        }, delayMs);
    };

    spawnManta();

    // --- Setup for dolphin pack (model_101a_-_adult_common_dolphin) ---
    const spawnDolphinPack = () => {
        const numDolphins = Math.floor(Math.random() * 2) + 2;

        // Base parameters for the group leader
        const centerR = 230 + Math.random() * 20;
        const centerTheta = Math.random() * Math.PI * 2;
        const basePosX = centerR * Math.cos(centerTheta);
        const basePosZ = centerR * Math.sin(centerTheta);
        const basePosY = -10 + Math.random() * 5;

        const baseRadius = centerR + (Math.random() * 40 - 20);

        const direction = Math.random() < 0.5 ? 1 : -1;
        const moveSpeed = 0.4; // Very fast
        const turnSpeed = (moveSpeed / baseRadius) * direction; // Group maintains the same angular velocity

        // The entire group starts at the same angle
        const initialAngle = Math.PI / 2 - centerTheta;

        let outOfBoundsCount = 0;

        for (let i = 0; i < numDolphins; i++) {
            // Apply slight offsets for non-leader dolphins
            const offsetX = i === 0 ? 0 : (Math.random() * 10 - 5);
            const offsetZ = i === 0 ? 0 : (Math.random() * 10 - 5);
            const offsetY = i === 0 ? 0 : (Math.random() * 10 - 5);
            const offsetRadius = i === 0 ? 0 : (Math.random() * 10 - 5);

            const posX = basePosX + offsetX;
            const posZ = basePosZ + offsetZ;
            const posY = basePosY + offsetY;
            const radius = baseRadius + offsetRadius;

            // Stagger spawn timing to create a trailing formation
            const delayMs = i * (1500 + Math.random() * 1500);

            setTimeout(() => {
                SceneLoader.ImportMeshAsync("", "./", "model_101a_-_adult_common_dolphin.glb", scene).then((result) => {
                    const rootNode = result.meshes[0];

                    if (rootNode.rotationQuaternion) {
                        rootNode.rotationQuaternion = null;
                    }
                    rootNode.rotation.y = Math.PI;

                    const wrapper = new TransformNode("dolphinWrapper_" + Math.random(), scene);
                    rootNode.setParent(wrapper);

                    wrapper.scaling = new Vector3(14, 14, 14);
                    wrapper.position = new Vector3(posX, posY, posZ);
                    wrapper.rotation.y = Math.random() * Math.PI * 2;

                    if (result.animationGroups && result.animationGroups.length > 0) {
                        const animSpeed = 0.9 + Math.random() * 0.2;
                        result.animationGroups.forEach(group => {
                            group.speedRatio = animSpeed;
                            group.play(true);
                        });
                    }

                    let currentAngle = initialAngle;

                    const updateDolphin = () => {
                        currentAngle += turnSpeed;
                        wrapper.position.x = posX + Math.sin(currentAngle) * radius;
                        wrapper.position.z = posZ + Math.cos(currentAngle) * radius;
                        wrapper.rotation.y = currentAngle + Math.sign(turnSpeed) * (Math.PI / 2);

                        // Once a full orbit is complete, the dolphin leaves the scene
                        if (Math.abs(currentAngle - initialAngle) >= Math.PI * 2) {
                            scene.onBeforeRenderObservable.removeCallback(updateDolphin);
                            rootNode.dispose();
                            wrapper.dispose();

                            outOfBoundsCount++;
                            // Respawn a new pack when all dolphins have exited
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

    spawnDolphinPack();
}
