import { Scene } from './scene';
import { Camera } from '../objects/camera'
import { Transform } from '../components/transform';
import { Vector3, AmbientLight } from 'three';
import { Cube } from '../objects/presets/cube';
import { mob } from '../objects/presets/mob';

// This is just an example scene. It holds a cube and a camera.

let transform = new Transform(
    new Vector3(0, 0, 5),
);

let transforma = new Transform();

let s1 = new Scene(new Camera(transform, 1280, 720, 200));
let cube = new Cube(transforma);
s1.gameObjects.push(cube);
s1.gameObjects.push(mob);
console.log(mob.object3D);


export { s1 };
