import { GameObject } from '../objects/gameObject';
import { OCamera, PCamera } from '../objects/camera';
import { Renderer } from '../renderer/renderer';

/** Scene that contains all the objects */
export class Scene {
    /** The list of game objects */
    gameObjects: GameObject[] = [];
    /** Current camera */
    camera: OCamera | PCamera; // ....... shouldn't exist?

    /**
     * Initializes scence
     * @param camera Camera to display the scene
     */
    constructor(camera: PCamera | OCamera) {
        this.camera = camera;
        //this.gameObjects.push(camera);
        // I commented this line but I am not sure if the camera should
        // be inside the game objects list.
        // The reason I commented it is because otherwise we would
        // be drawing the camera on the Renderer loop. This doesn't look
        // right.
    }

    /**
     * Updates the scene and all the objects in it
     * @param deltaTime the delta time between frames (to untie physics from framerate)
     */
    update(deltaTime: number){
        for(let gameObject of this.gameObjects){
            gameObject.update(deltaTime);
        }
    }

    /**
     * Loads the object meshes
     * @param renderer Renderer to load into
     */
    async loadObjectMeshes(renderer: Renderer){
        for (let obj of this.gameObjects){
            await obj.loadMesh();
        }
        renderer.load();
    }
}
