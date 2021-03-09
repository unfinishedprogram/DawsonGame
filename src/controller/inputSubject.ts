import { Subject } from '../utils/subject';
import { Action } from '../utils/action';

enum KeyState {
    UP,
    DOWN
}

export class Input {
    key: string;
    state: KeyState;
    constructor(key: string, state: KeyState) {
        this.key = key;
        this.state = state;
    }
}

export class InputSubject extends Subject<Input> {
    private listeners: Function[];
    constructor(){
        super();

        this.listeners = [
            this.keyUpListener,
            this.keyDownListener,
        ] 

        // Initializes each listener.
        this.listeners.forEach(f => f(this));

    }

    public registerListener(f: Function) {
        if (!this.listeners.filter(a => f === a)) {
            f();
            this.listeners.push(f);
        } else {
            console.error("Trying to add existing event listener!");
        }
    }

    private keyUpListener(that: InputSubject) {
        window.addEventListener('keyup', function (e: KeyboardEvent) {
            that.notify(Action.KEYBOARD_INPUT, new Input(e.code, KeyState.UP));
        });
    }

    private keyDownListener(that: InputSubject) {
        window.addEventListener('keydown', function (e: KeyboardEvent) {
            that.notify(Action.KEYBOARD_INPUT, new Input(e.code, KeyState.DOWN));
        });
    }

}
