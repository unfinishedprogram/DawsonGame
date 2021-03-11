import { Subject } from '../utils/subject';
import { Action } from '../utils/action';

export enum ButtonState {
    UP,
    DOWN,
}



export class KeyboardInput {
    key: string;
    state: ButtonState;
    constructor(key: string, state: ButtonState) {
        this.key = key;
        this.state = state;
    }
}

export class MouseMoveInput {
    x: number;
    y: number;
    constructor(offsetX: number, offsetY:number){
        this.x = offsetX;
        this.y = offsetY;
    }
}

export class MouseClickInput {
    button:number;
    buttonState: ButtonState;
    constructor(button:number, state: ButtonState){
        this.buttonState = state;
        this.button = button;
    }
}

export class KeyboardInputSubject extends Subject<KeyboardInput> {
    private listeners: Function[];
    constructor() {
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

    private keyUpListener(that: KeyboardInputSubject) {
        window.addEventListener('keyup', function (e: KeyboardEvent) {
            that.notify(Action.KEYBOARD_INPUT, new KeyboardInput(e.code, ButtonState.UP));
        });
    }

    private keyDownListener(that: KeyboardInputSubject) {
        window.addEventListener('keydown', function (e: KeyboardEvent) {
            that.notify(Action.KEYBOARD_INPUT, new KeyboardInput(e.code, ButtonState.DOWN));
        });
    }



}

export class MouseMoveInputSubject extends Subject<MouseMoveInput> {
    private listeners: Function[];
    constructor() {
        super();

        this.listeners = [
            this.mouseMoveListner,
        ] 

        // Initializes each listener.
        this.listeners.forEach(f => f(this));
    }

    private mouseMoveListner(that: MouseMoveInputSubject){
        document.getElementsByTagName("canvas")[0].addEventListener('mousemove', function (e: MouseEvent) {
            that.notify(Action.MOUSE_INPUT, new MouseMoveInput(e.pageX - this.offsetLeft, e.pageY - this.offsetTop));
        });
    }

}


export class MouseClickInputSubject extends Subject<MouseClickInput> {
    private listeners: Function[];
    constructor() {
        super();

        this.listeners = [
            this.mouseUpListner,
            this.mouseDownListner
        ] 

        // Initializes each listener.
        this.listeners.forEach(f => f(this));
    }

    private mouseDownListner(that: MouseClickInputSubject){
        window.addEventListener('mousedown', function (e: MouseEvent) {

            that.notify(Action.MOUSE_INPUT, new MouseClickInput(e.button, ButtonState.DOWN));
        });
    }

    private mouseUpListner(that: MouseClickInputSubject){
        window.addEventListener('mouseup', function (e: MouseEvent) {
           
            that.notify(Action.MOUSE_INPUT, new MouseClickInput(e.button, ButtonState.UP));
        });
    }
}
