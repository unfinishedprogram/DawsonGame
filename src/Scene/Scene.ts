import { GameObject } from '../Objects/GameObject';
import { Camera } from '../Objects/Camera';

export class Scene {
    gameObjects: GameObject[] = [];
    camera: Camera; // ....... shouldn't exist?

    constructor(camera: Camera) {
        this.camera = camera;
        //this.gameObjects.push(camera);
        // I commented this line but I am not sure if the camera should
        // be inside the game objects list.
        // The reason I commented it is because otherwise we would
        // be drawing the camera on the Renderer loop. This doesn't look
        // right.
    }

}
