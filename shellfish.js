import { SceneLoader, TransformNode, Vector3 } from '@babylonjs/core';

export function loadShellfishes(scene) {

    // --- Setup for snail_shell.glb ---
    const numSnailShells = Math.floor(Math.random() * 3) + 10;

    for (let i = 0; i < numSnailShells; i++) {
        // Use the same placement logic as the sea snails
        const posX = -200 + Math.random() * 400;
        const posZ = -200 + Math.random() * 400;
        const posY = -41 + Math.random() * 3;

        SceneLoader.ImportMeshAsync("", "./", "snail_shell.glb", scene).then((result) => {
            const rootNode = result.meshes[0];

            if (rootNode.rotationQuaternion) {
                rootNode.rotationQuaternion = null;
            }

            const wrapper = new TransformNode("snailShellWrapper_" + i, scene);
            rootNode.setParent(wrapper);

            wrapper.scaling = new Vector3(0.3, 0.3, 0.3);
            wrapper.position = new Vector3(posX, posY, posZ);

            // Keep it upright, but rotate it randomly on the horizontal plane
            wrapper.rotation.y = Math.random() * Math.PI * 2;

            // Hide the circular base plate commonly found in Sketchfab models
            result.meshes.forEach(mesh => {
                const meshName = mesh.name.toLowerCase();
                const matName = mesh.material ? mesh.material.name.toLowerCase() : "";

                if (meshName.includes("floor") || matName.includes("floor")) {
                    mesh.isVisible = false;
                }
            });
        });
    }

    // --- Setup for fluted_giant_clam_shell.glb ---
    const numClamShells = Math.floor(Math.random() * 3) + 3;

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

            wrapper.scaling = new Vector3(0.1, 0.1, 0.1);
            wrapper.position = new Vector3(posX, posY, posZ);

            // Tilt the upright model by 90 degrees to lay it flat on the seabed
            wrapper.rotation.x = Math.PI / 2;

            // Apply random rotations on other axes
            wrapper.rotation.y = Math.random() * Math.PI * 2;
            wrapper.rotation.z = Math.random() * Math.PI * 2;
        });
    }

    // --- Setup for clam_shell.glb ---
    const numClamShells2 = Math.floor(Math.random() * 6) + 20;

    for (let i = 0; i < numClamShells2; i++) {
        const posX = -200 + Math.random() * 400;
        const posZ = -200 + Math.random() * 400;
        const posY = -34 + Math.random() * 2;

        SceneLoader.ImportMeshAsync("", "./", "clam_shell.glb", scene).then((result) => {
            const rootNode = result.meshes[0];

            if (rootNode.rotationQuaternion) {
                rootNode.rotationQuaternion = null;
            }

            const wrapper = new TransformNode("clamShellWrapper2_" + i, scene);
            rootNode.setParent(wrapper);

            wrapper.scaling = new Vector3(6.0, 6.0, 6.0);
            wrapper.position = new Vector3(posX, posY, posZ);

            // Randomize orientation along all axes
            wrapper.rotation.x = Math.random() * Math.PI * 2;
            wrapper.rotation.y = Math.random() * Math.PI * 2;
            wrapper.rotation.z = Math.random() * Math.PI * 2;
        });
    }

    // --- Setup for cc0__japanese_baking_scallop_p._albicans.glb ---
    const numScallops = Math.floor(Math.random() * 6) + 20;

    for (let i = 0; i < numScallops; i++) {
        const posX = -200 + Math.random() * 400;
        const posZ = -200 + Math.random() * 400;
        const posY = -34 + Math.random() * 2;

        SceneLoader.ImportMeshAsync("", "./", "cc0__japanese_baking_scallop_p._albicans.glb", scene).then((result) => {
            const rootNode = result.meshes[0];

            if (rootNode.rotationQuaternion) {
                rootNode.rotationQuaternion = null;
            }

            const wrapper = new TransformNode("scallopWrapper_" + i, scene);
            rootNode.setParent(wrapper);

            wrapper.scaling = new Vector3(0.5, 0.5, 0.5);
            wrapper.position = new Vector3(posX, posY, posZ);

            // Lay it flat by rotating 90 degrees around the X-axis
            wrapper.rotation.x = Math.PI / 2;
            wrapper.rotation.y = Math.random() * Math.PI * 2;
            wrapper.rotation.z = Math.random() * Math.PI * 2;

            // Hide extraneous nodes and materials like cubes or bounding boxes
            result.meshes.forEach(mesh => {
                const meshName = mesh.name.toLowerCase();
                const matName = mesh.material ? mesh.material.name.toLowerCase() : "";

                if (meshName.includes("cube") || meshName.includes("box") || meshName.includes("empty") || matName.includes("material.001")) {
                    mesh.isVisible = false;
                }
            });
        });
    }
}
