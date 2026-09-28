import { FreeCamera, Vector3 } from '@babylonjs/core';

export function setupCamera(scene) {
    const camera = new FreeCamera('camera1', new Vector3(0, -15, -10), scene);
    camera.setTarget(Vector3.Zero());

    // Rotate the camera slowly to create a circular panning effect
    let alpha = 0;
    scene.onBeforeRenderObservable.add(() => {
        alpha += 0.0005;

        // Circular movement
        camera.position.x = Math.cos(alpha) * 100;
        camera.position.z = Math.sin(alpha) * 100;
        // Add a slight vertical bobbing effect for a floating sensation
        camera.position.y = -15 + Math.sin(alpha * 0.5) * 3;

        const targetX = 0;
        const targetZ = 0;
        
        // Vertical displacement from the base y-position
        const yOffset = Math.sin(alpha * 0.5) * 3;
        
        // Slightly tilt the camera up or down proportionally to the vertical displacement
        // Looks slightly upwards when high, and downwards when low
        // Coefficient limits the tilt to prevent capturing only the surface or the ground
        const tilt = yOffset * 1.5; 
        const targetY = camera.position.y + tilt;
        camera.setTarget(new Vector3(targetX, targetY, targetZ));
    });

    return camera;
}
