import { Action } from '../utils/action';
import { Observer } from '../utils/observer';
import { Input, KeyState} from './inputSubject';


export class KeyboardObserver extends Observer<Input> {
    private inputMap: string[];
    
    // inputMap should be an array of keys that are going to be listened.
    constructor(inputMap: string[]) {
        super();
        this.inputMap = inputMap;
    }

    onNotify(action: Action, info: Input) {
        if ( action !== Action.KEYBOARD_INPUT) return;
        if ( !this.inputMap.includes(info.key)) return;

        if (info.state === KeyState.UP)
            globalThis.Input.keyStates[info.key] = false; 
        else if (info.state === KeyState.DOWN && !globalThis.Input.keyStates[info.key])
            globalThis.Input.keyStates[info.key] = true;

        console.log(globalThis.Input.keyStates);

    }

};
