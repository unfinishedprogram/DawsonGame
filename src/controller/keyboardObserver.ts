import { Action } from '../utils/action';
import { Observer } from '../utils/observer';
import { KeyboardInput, ButtonState} from './inputSubject';


export class KeyboardObserver extends Observer<KeyboardInput> {
    private inputMap: string[];
    
    // inputMap should be an array of keys that are going to be listened.
    constructor(inputMap: string[]) {
        super();
        this.inputMap = inputMap;
    }

    onNotify(action: Action, info: KeyboardInput) {
        if ( action !== Action.KEYBOARD_INPUT) return;
        if ( !this.inputMap.includes(info.key)) return;

        if (info.state === ButtonState.UP)
            globalThis.Input.keyStates[info.key] = false; 
        else if (info.state === ButtonState.DOWN && !globalThis.Input.keyStates[info.key])
            globalThis.Input.keyStates[info.key] = true;

        console.log(globalThis.Input.keyStates);
    }
};
