import { Subject } from '../utils/subject';
import { Action } from '../utils/action';
import { Vector2 } from 'three';

/** Represents the button state. Key can be UP or DOWN*/
export enum ButtonState {
    UP,
    DOWN,
}

// Keyboard
/** Represents the keyboard input */
export class KeyboardInput {
    key: string;
    state: ButtonState;
    /**
     * Initializes keyboard input 
     * @param key Keycode of the key 
     * @param state State of the key
     */
    constructor(key: string, state: ButtonState) {
        this.key = key;
        this.state = state;
    }
}

/** Subject for keyboard keys events */
export class KeyboardInputSubject extends Subject<KeyboardInput> {
    private listeners: Function[];
    /** Initialize keyboard input subject */
    constructor() {
        super();

        this.listeners = [
            this.keyUpListener,
            this.keyDownListener,
        ] 

        // Initializes each listener.
        this.listeners.forEach(f => f(this));
    }

    // Unused, maybe delete?
    public registerListener(f: Function) {
        if (!this.listeners.filter(a => f === a)) {
            f();
            this.listeners.push(f);
        } else {
            console.error("Trying to add existing event listener!");
        }
    }

    /**
     * Initializes key up listener
     * @param that Keyboard input subject
     */
    private keyUpListener(that: KeyboardInputSubject) {
        window.addEventListener('keyup', function (e: KeyboardEvent) {
            that.notify(Action.KEYBOARD_INPUT, new KeyboardInput(e.code, ButtonState.UP));
        });
    }
    /**
     * Initializes key down listener
     * @param that Keyboard input subject
     */
    private keyDownListener(that: KeyboardInputSubject) {
        window.addEventListener('keydown', function (e: KeyboardEvent) {
            that.notify(Action.KEYBOARD_INPUT, new KeyboardInput(e.code, ButtonState.DOWN));
        });
    }
}


// Mouse
/** Represents the mouse movement input */
export class MouseMoveInput {
    x: number;
    y: number;
    /**
     * Initializes the mouse movement input 
     * @param offsetX Relative pixel location of the cursor to the canvas on the X axis
     * @param offsetY  Relative pixel location of the cursor to the canvas on the B axis
     */
    constructor(offsetX: number, offsetY:number) {
        this.x = offsetX;
        this.y = offsetY;
    }
}
/** Represents the mouse button input */
export class MouseButtonInput {
    button: number;
    buttonState: ButtonState;
    /**
     * Initializes mouse button input
     * @param button Mouse button ID
     * @param state The state of the mouse button (UP/DOWN)
     */
    constructor(button: number, state: ButtonState) {
        this.buttonState = state;
        this.button = button;
    }
}

/** Subject for mouse movement input */
export class MouseMoveInputSubject extends Subject<MouseMoveInput> {
    private listeners: Function[];
    /** Initializes mouse input subject */
    constructor() {
        super();

        this.listeners = [
            this.mouseMoveListner,
        ] 

        // Initializes each listener.
        this.listeners.forEach(f => f(this));
    }

    /**
     * Initializes mouse move listener
     * @param that Mouse move input subject
     */
    private mouseMoveListner(that: MouseMoveInputSubject){
        document.getElementsByTagName("canvas")[0].addEventListener('mousemove', function (e: MouseEvent) {
            that.notify(Action.MOUSE_INPUT, new MouseMoveInput(e.pageX - this.offsetLeft, e.pageY - this.offsetTop));
        });
    }

}
/** Subject for mouse button input*/
export class MouseButtonInputSubject extends Subject<MouseButtonInput> {
    private listeners: Function[];
    /** Initializes mouse button input subject */
    constructor() {
        super();

        this.listeners = [
            this.mouseUpListner,
            this.mouseDownListner
        ] 

        // Initializes each listener.
        this.listeners.forEach(f => f(this));
    }

    /**
     * Initializes mouse button down listener
     * @param that Mouse button input subject
     */
    private mouseDownListner(that: MouseButtonInputSubject) {
        window.addEventListener('mousedown', function (e: MouseEvent) {
            that.notify(Action.MOUSE_INPUT, new MouseButtonInput(e.button, ButtonState.DOWN));
        });
    }

    /**
     * Initializes mouse button up listener
     * @param that Mouse button input subject
     */
    private mouseUpListner(that: MouseButtonInputSubject) {
        window.addEventListener('mouseup', function (e: MouseEvent) {
            that.notify(Action.MOUSE_INPUT, new MouseButtonInput(e.button, ButtonState.UP));
        });
    }
}


// Gamepad
export interface GamepadButtonInput {
    button: number;
    state: ButtonState;
}
export interface GamepadAnalogInput {
    stick: number,
    value: Vector2;
}
export interface CustomGamepadInputEvent {
    button: number;
}
export interface CustomGamepadAnalogEvent {
    stick: number,
    value: Vector2;
}

/** Subject for gamepad button input*/
export class GamepadInputSubject extends Subject<GamepadButtonInput> {
    public buttonDown(e: CustomGamepadInputEvent) {
        this.notify(Action.GAMEPAD_INPUT, {button: e.button, state: ButtonState.DOWN});
    }
    public buttonUp(e: CustomGamepadInputEvent) {
        this.notify(Action.GAMEPAD_INPUT, {button: e.button, state: ButtonState.UP});
    }
}
/** Subject for gamepad analog input*/
export class GamepadMoveSubject extends Subject<GamepadAnalogInput> {
    public moveAnalong(e: CustomGamepadAnalogEvent) {
        this.notify(Action.GAMEPAD_MOVE, {stick: e.stick, value: e.value} )
    }
}
