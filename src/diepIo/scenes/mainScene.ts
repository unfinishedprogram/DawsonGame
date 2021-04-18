import { Scene } from '../../scene/scene';
import { PCamera } from '../../objects/camera'
import { Transform } from '../../components/transform';
import { Vector3 } from 'three';
import { DiepPlayer } from '../objects/diepPlayer';
import { StaticCube } from '../objects/staticCube';
import { Cube } from '../../objects/presets/cube';
import { Action } from '../../utils/action';
import { ChangeObject } from '../../subjects/objectSubject';
// This is just an example scene. It holds a cube and a camera.

/** The transform (location and rotation) of the in game camera */
let cameraTransform = new Transform (
    new Vector3(0, 300, 0), // Location
    new Vector3(-Math.PI / 2, 0, 0) // Rotation
);

let pTransform = new Transform();

let camera = new PCamera(cameraTransform, 45, 1280, 720);

let gameScene = new Scene(camera);

let player = new DiepPlayer(pTransform);

camera.update = (deltaTime:number) => {
    let target = new Vector3(...player.object3D.position.toArray());
    target.y = 300;
    let current = camera.camera.position;
    let next = current.add(target.sub(current).multiplyScalar(deltaTime * 5));
    camera.camera.position.set(...next.toArray());
    camera.camera.position.y = 300;
}

let cube = new StaticCube(new Transform(new Vector3((Math.random()-0.5)*20,0, (Math.random()-0.5)*20)))
gameScene.gameObjects.push(cube);
console.log(gameScene.gameObjects);
gameScene.gameObjects.push(player);

export { gameScene };
