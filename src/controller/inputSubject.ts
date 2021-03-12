import { Subject } from '../utils/subject';
import { Action } from '../utils/action';

/** Represents the button state. Key can be UP or DOWN*/
export enum ButtonState {
    UP,
    DOWN,
}

/** Represents the keyboard input */
export interface KeyboardInput {
    /** Keycode of the key */
    key: string;
    /** State of the key */
    state: ButtonState;
}

/** Represents the mouse movement input */
export interface MouseMoveInput {
    /** Relative pixel location of the cursor to the canvas on the X axis */
    x: number;
    /** Relative pixel location of the cursor to the canvas on the B axis */
    y: number;
}

/** Represents the mouse button input */
export interface MouseButtonInput {
    /** Mouse button ID */
    button: number;
    /**  The state of the mouse button (UP/DOWN) */
    state: ButtonState;
}

/** Represents the Gamepad button input */
export interface GamepadButtonInput {
    button: number;
    state: ButtonState;
}

/** Represents the Gampead stick input */
export interface GamepadMoveInput {
    axis: number;
    value: number;
}

/** Represents the data of our own GamepadEvent that is triggered
    when a button is pressed */
export interface CustomGamepadInputEvent {
    /** The button that was pressed */
    button: number;
}

/** Represents the data of our own GamepadEvent that is triggered 
    when one of the sticks is moved */
export interface CustomGamepadMoveEvent {
    /** Identifier for the stick and direction of the moved stick */
    axis: number;
    /** A float number from 0 to 1 that represents the stick offset from the center */
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

/** Subject that deals with changes on the Gamepad Buttons */
export class GamepadInputSubject extends Subject<GamepadButtonInput> {
    public buttonDown(e: CustomGamepadInputEvent) {
        this.notify(Action.GAMEPAD_INPUT, {button: e.button, state: ButtonState.DOWN});
    }
    public buttonUp(e: CustomGamepadInputEvent) {
        this.notify(Action.GAMEPAD_INPUT, {button: e.button, state: ButtonState.UP});
    }
}

/** Subject that deals with changes on the Gamepad sticks */
export class GamepadMoveSubject extends Subject<GamepadMoveInput> {
    public moveAnalong(e: CustomGamepadMoveEvent) {
        this.notify(Action.GAMEPAD_MOVE, {value: e.value, axis: e.axis } )
    }
}
