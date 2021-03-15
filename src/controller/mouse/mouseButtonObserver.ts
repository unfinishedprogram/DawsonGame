import { Action } from '../../utils/action';
import { Observer } from '../../utils/observer';
import { ButtonState, MouseButtonInput} from '../inputSubject';

export enum MouseButtons {
    LEFT_MOUSE_BUTTON,
    MIDDLE_MOUSE_BUTTON,
    RIGHT_MOUSE_BUTTON,
    BACK_THUMB_MOUSE_BUTTON,
    FORWARD_THUMB_BUTTON
}

/** Represents the mouse observer that processes all the mouse movement button */
export class MouseButtonObserver extends Observer<MouseButtonInput> {
    /** Initializes mouse button observer */
    constructor() {
        super();
    }

    onNotify(action: Action, info: MouseButtonInput) {
        if ( action !== Action.MOUSE_INPUT) return;
        if (info.buttonState === ButtonState.DOWN)
            globalThis.Input.setMouseButtonKeyState(info.button, true);
        else
            globalThis.Input.setMouseButtonKeyState(info.button, false);
    }
};
