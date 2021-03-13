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

        globalThis.Input.mosuePos.x = info.x; 
        globalThis.Input.mosuePos.y = info.y; 

        let cvsWidth = this.canvasElm.clientWidth;
        let cvsHeight = this.canvasElm.clientHeight;

        var normalizedMouse = new Vector2(info.x / cvsWidth * 2 - 1 , -info.y / cvsHeight * 2 + 1);
        raycaster.setFromCamera(normalizedMouse, globalThis.Input.camera);
		raycaster.ray.intersectPlane(this.plane, globalThis.Input.projectedMousePos);
    }
};
