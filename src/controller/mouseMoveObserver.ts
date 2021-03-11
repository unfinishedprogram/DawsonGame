import { Action } from '../utils/action';
import { Observer } from '../utils/observer';
import { MouseMoveInput, ButtonState} from './inputSubject';


export class MouseMoveObserver extends Observer<MouseMoveInput> {
    constructor() {
        super();
    }

    onNotify(action: Action, info: MouseMoveInput) {
        if ( action !== Action.MOUSE_INPUT) return;
        console.log(info);
    
    }

};
