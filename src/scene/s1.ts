import { Scene } from './scene';
import { PCamera, OCamera } from '../objects/camera'
import { Transform } from '../components/transform';
import { Vector3 } from 'three';
import { Cube } from '../objects/presets/cube';
import { mob } from '../objects/presets/mob';

// This is just an example scene. It holds a cube and a camera.

let cameraTransform = new Transform(
    new Vector3(0, 0, 50),
);

let transforma = new Transform();

//let s1 = new Scene(new OCamera(cameraTransform, 1280, 720, 100));

let s1 = new Scene(new PCamera(cameraTransform, 45, 1280, 720));

let cube = new Cube(transforma);
s1.gameObjects.push(cube);

async function loadMeshes(){
    await mob.loadMesh();
    s1.gameObjects.push(mob);
    console.log(mob.mesh);
}

loadMeshes();

export { s1 };
