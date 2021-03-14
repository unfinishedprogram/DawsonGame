import { Action } from '../../utils/action';
import { Observer } from '../../utils/observer';
import { ButtonState, MouseButtonInputSubject, MouseButtonInput} from '../inputSubject';

/** Represents the mouse observer that processes all the mouse movement button */
export class MouseButtonObserver extends Observer<MouseButtonInput> {
    /** Initializes mouse button observer */
    constructor() {
        super();
    }

    onNotify(action: Action, info: MouseButtonInput) {
        if ( action !== Action.MOUSE_INPUT) return;
    }
};
