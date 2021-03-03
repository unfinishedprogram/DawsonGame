import { GameObject } from '../objects/gameObject';
import { OCamera, PCamera } from '../objects/camera';
import { Renderer } from '../renderer/renderer';
/**
 * @param {PCamera | OCamera} camera To display the scene
 */
export class Scene {
    gameObjects: GameObject[] = [];
    camera: OCamera | PCamera; // ....... shouldn't exist?

    constructor(camera: PCamera | OCamera) {
        this.camera = camera;
        //this.gameObjects.push(camera);
        // I commented this line but I am not sure if the camera should
        // be inside the game objects list.
        // The reason I commented it is because otherwise we would
        // be drawing the camera on the Renderer loop. This doesn't look
        // right.
    }

    update(deltaTime: number){
        for(let gameObject of this.gameObjects){
            gameObject.update(deltaTime);
        }
    }

    /**
     * 
     * @param renderer 
     */
    async loadObjectMeshes(renderer: Renderer){
        for (let obj of this.gameObjects){
            await obj.loadMesh();
        }
        renderer.load();
    }
}
