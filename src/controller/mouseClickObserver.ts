import { Action } from '../utils/action';
import { Observer } from '../utils/observer';
import { ButtonState, MouseClickInputSubject, MouseClickInput} from './inputSubject';


export class MouseClickObserver extends Observer<MouseClickInput> {
    constructor() {
        super();
    }

    onNotify(action: Action, info: MouseClickInput) {
        if ( action !== Action.MOUSE_INPUT) return;
        console.log(info);
    }
};