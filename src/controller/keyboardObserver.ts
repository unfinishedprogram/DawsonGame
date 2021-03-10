import { Action } from '../utils/action';
import { Observer } from '../utils/observer';
import { Input, KeyState } from './inputSubject';

export class KeyboardObserver extends Observer<Input> {
    
    onNotify(action: Action, info: Input) {
        if ( action !== Action.KEYBOARD_INPUT ) return;

        if (info.state === KeyState.UP)
            globalThis.Input.keyStates[info.key] = false; 
        else if (info.state === KeyState.DOWN && !globalThis.Input.keyStates[info.key])
            // We need to also check if the key is part of the registered keys.
            globalThis.Input.keyStates[info.key] = true;

        console.log(globalThis.Input.keyStates);

    }

};
