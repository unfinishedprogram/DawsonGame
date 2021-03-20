import { Plane, Raycaster, Vector2, Vector3 } from 'three';
import { Action } from '../../utils/action';
import { Observer } from '../../utils/observer';
import { MouseMoveInput} from '../inputSubject';

/** Represents observer that processes mouse movement input */
export class MouseMoveObserver extends Observer<MouseMoveInput> {
    plane: Plane;
    canvasElm: Element;
    /** Initializes mouse move observer */
    constructor() {
        super();
        this.plane = new Plane( new Vector3( 0, 1, 0 ), 0);
        this.canvasElm = document.getElementsByTagName("canvas")[0];
    }

    onNotify(action: Action, info: MouseMoveInput) {
        if ( action !== Action.MOUSE_INPUT) return;
        let raycaster = new Raycaster();
        let intersectionPoint = new Vector3();

        globalThis.Input.getMousePosition().x = info.x; 
        globalThis.Input.getMousePosition().y = info.y; 

        let cvsWidth = this.canvasElm.clientWidth;
        let cvsHeight = this.canvasElm.clientHeight;

        let normalizedX = (info.x / cvsWidth) * 2 - 1;
        let normalizedY = -(info.y / cvsHeight * 2 -1);

        raycaster.setFromCamera(new Vector2(normalizedX, normalizedY), globalThis.Input.camera);
		raycaster.ray.intersectPlane(this.plane, intersectionPoint);
        globalThis.Input.setProjectedMousePosition(intersectionPoint);
    }
};
