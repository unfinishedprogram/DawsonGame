import { Subject } from '../utils/subject';
import { Action } from '../utils/action';

/** Represents the button state. Key can be UP or DOWN*/
export enum ButtonState {
    UP,
    DOWN,
}

/** Represents the keyboard input */
export interface KeyboardInput {
    key: string;
    state: ButtonState;
    /**
     * Initializes keyboard input 
     * @param key Keycode of the key 
     * @param state State of the key
     */
}

/** Represents the mouse movement input */
export interface MouseMoveInput {
    x: number;
    y: number;
    /**
     * Initializes the mouse movement input 
     * @param offsetX Relative pixel location of the cursor to the canvas on the X axis
     * @param offsetY  Relative pixel location of the cursor to the canvas on the B axis
     */
}

/** Represents the mouse button input */
export interface MouseButtonInput {
    button: number;
    state: ButtonState;
    /**
     * Initializes mouse button input
     * @param button Mouse button ID
     * @param state The state of the mouse button (UP/DOWN)
     */
}

export interface GamepadButtonInput {
    button: number;
    state: ButtonState;
}

export interface GamepadMoveInput {
    axis: number;
    value: number;
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
            that.notify(Action.KEYBOARD_INPUT, {key: e.code, state: ButtonState.UP});
        });
    }
    /**
     * Initializes key down listener
     * @param that Keyboard input subject
     */
    private keyDownListener(that: KeyboardInputSubject) {
        window.addEventListener('keydown', function (e: KeyboardEvent) {
            that.notify(Action.KEYBOARD_INPUT, {key: e.code, state: ButtonState.DOWN});
        });
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
            that.notify(Action.MOUSE_INPUT, {x: e.pageX - this.offsetLeft, y: e.pageY - this.offsetTop});
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
            that.notify(Action.MOUSE_INPUT, {button: e.button, state: ButtonState.DOWN});
        });
    }

    /**
     * Initializes mouse button up listener
     * @param that Mouse button input subject
     */
    private mouseUpListner(that: MouseButtonInputSubject) {
        window.addEventListener('mouseup', function (e: MouseEvent) {
            that.notify(Action.MOUSE_INPUT, {button: e.button, state: ButtonState.UP});
        });
    }
}

export interface CustomGamepadInputEvent {
    button: number;
}

export interface CustomGamepadMoveEvent {
    axis: number;
    value: number;
}

export class GamepadInputSubject extends Subject<GamepadButtonInput> {
    public buttonDown(e: CustomGamepadInputEvent) {
        this.notify(Action.GAMEPAD_INPUT, {button: e.button, state: ButtonState.DOWN});
    }
    public buttonUp(e: CustomGamepadInputEvent) {
        this.notify(Action.GAMEPAD_INPUT, {button: e.button, state: ButtonState.UP});
    }
}

export class GamepadMoveSubject extends Subject<GamepadMoveInput> {
    public moveAnalong(e: CustomGamepadMoveEvent) {
        this.notify(Action.GAMEPAD_MOVE, {value: e.value, axis: e.axis } )
    }
}
