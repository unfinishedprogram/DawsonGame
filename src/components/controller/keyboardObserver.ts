import { Action } from '../../utils/action';
import { Observer } from '../../utils/observer';
import { Input } from './inputSubject';

export class KeyboardObserver extends Observer<Input> {
    onNotify(action: Action, info: Input) {
        if ( action !== Action.KEYBOARD_INPUT ) return;

        console.log(info);

    }
};
