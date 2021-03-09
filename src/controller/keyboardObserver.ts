import { Action } from '../utils/action';
import { Observer } from '../utils/observer';
import { Input, KeyState } from './inputSubject';

export class KeyboardObserver extends Observer<Input> {
    private keyStates: { [id: string]: boolean } = {};
    
    onNotify(action: Action, info: Input) {
        if ( action !== Action.KEYBOARD_INPUT ) return;

        if (info.state === KeyState.UP)
            delete this.keyStates[info.key];
        
        if (info.state === KeyState.DOWN && !this.keyStates[info.key])
            this.keyStates[info.key] = true;
    }

    public isKeyDown(keycode: string) : boolean {
        return this.keyStates[keycode];
    }
};
