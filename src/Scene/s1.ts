import { Scene } from './Scene';
import { Camera } from '../Objects/Camera'
import { Transform } from '../Components/Transform';
import { Vector3 } from 'three';
import { Cube } from '../Objects/presets/Cube';

// This is just an example scene. It holds a cube and a camera.

let transform = new Transform(
    new Vector3(0, 0, 5),
    new Vector3(0, 0, 0),
    new Vector3(1, 1, 1)
);

let transforma = new Transform(
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0),
    new Vector3(1, 1, 1)
);

let s1 = new Scene(new Camera(transform, 1280, 720, 200));
let cube = new Cube(transforma);
s1.gameObjects.push(cube);
export { s1 };
