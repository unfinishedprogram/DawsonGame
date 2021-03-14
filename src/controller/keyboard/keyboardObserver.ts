import { Action } from '../../utils/action';
import { Observer } from '../../utils/observer';
import { KeyboardInput, ButtonState} from '../inputSubject';

/** Represents the keyboard observer that processes all keyboard input */
export class KeyboardObserver extends Observer<KeyboardInput> {
    private inputMap: string[];
    
    /**
     * Initializes the keyboard observer
     * @param inputMap An array of the keys that are going to be listened to
     */
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
