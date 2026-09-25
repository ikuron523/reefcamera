const radius = 70;
const moveSpeed = 0.03;
let direction = -1;
let turnSpeed = (moveSpeed / radius) * direction;
let currentAngle = 0;
for(let i=0; i<5; i++) {
    currentAngle += turnSpeed;
    let x = Math.sin(currentAngle) * radius;
    let z = Math.cos(currentAngle) * radius;
    console.log(`dir: ${direction}, x: ${x}, z: ${z}`);
}
direction = 1;
turnSpeed = (moveSpeed / radius) * direction;
currentAngle = 0;
for(let i=0; i<5; i++) {
    currentAngle += turnSpeed;
    let x = Math.sin(currentAngle) * radius;
    let z = Math.cos(currentAngle) * radius;
    console.log(`dir: ${direction}, x: ${x}, z: ${z}`);
}
