import { GameObject } from '../objects/gameObject';
import { OCamera, PCamera } from '../objects/camera';
import { Renderer } from '../renderer/renderer';
import { ChangeObject } from '../subjects/objectSubject';
import { Observer } from '../utils/observer';
import { Action } from '../utils/action';

/** Scene that contains all the objects */
export class Scene extends Observer<ChangeObject>{
    /** The list of game objects */
    gameObjects: GameObject[] = [];
    /** Current camera */
    camera: OCamera | PCamera; // ....... shouldn't exist?

    /** Renderer of the scene */
    renderer: Renderer|undefined;

    /**
     * Initializes scence
     * @param camera Camera to display the scene
     */
    constructor(camera: PCamera | OCamera) {
        super();
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

    setRenderer(renderer: Renderer) {
        this.renderer = renderer;
    }

    removeGameObject(object:GameObject){
        let index = this.gameObjects.indexOf(object, 0);
        if (index > -1) {
            this.gameObjects.splice(index, 1);
            if(this.renderer) this.renderer.tscene.remove(object.object3D);
        }
    }

    addGameObject(object : GameObject){
        this.gameObjects.push(object);
    }

    onNotify(action: Action, info: ChangeObject):void {
        if ( action !== Action.ADD_OBJECT && action !== Action.REMOVE_OBJECT) return;
        if ( action == Action.ADD_OBJECT) this.addGameObject(info.object);
        if ( action == Action.REMOVE_OBJECT) this.removeGameObject(info.object);
        return;
    }
}
