import { Scene } from '../../scene/scene';
import { PCamera } from '../../objects/camera'
import { Transform } from '../../components/transform';
import { Vector3 } from 'three';
import { GamePlayer } from '../../objects/presets/gamePlayer';
import { LevelGeo } from '../../objects/presets/levelGeo';
import { CollisionSignleton } from '../../collision/collisionSingleton';
// This is just an example scene. It holds a cube and a camera.

/** The transform (location and rotation) of the in game camera */
let cameraTransform = new Transform (
    new Vector3(0, 300, 0), // Location
    new Vector3(-Math.PI / 2, 0, 0) // Rotation
);

/** Transform of example cube */
let transforma = new Transform();

//let s1 = new Scene(new OCamera(cameraTransform, 1280, 720, 100));
let gameScene = new Scene(new PCamera(cameraTransform, 45, 1280, 720));

let cube = new GamePlayer(transforma);
let floor = new LevelGeo(transforma);

// Delete this later, it is horrible
gameScene.addInitalGameObject(cube);
gameScene.addInitalGameObject(floor);

export { gameScene };
