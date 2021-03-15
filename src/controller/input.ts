import { OrthographicCamera, PerspectiveCamera, Vector2, Vector3 } from "three";
import { GamepadAxis } from "./gamepad/gamepadAnalogObserver";
import { GamepadButtons } from "./gamepad/gamepadButtonObserver";
import { MouseButtons } from "./mouse/mouseButtonObserver";

export class InputSingleton {
    private static _instance: InputSingleton;
    // Keyboard
    private keyboardKeyStates: { [id: string]: boolean } = {};
    // Mouse
    private mousePos: Vector2 = new Vector2();
    private projectedMousePos: Vector3 = new Vector3();
    private mouseButtonsStates: { [id: number]: boolean } = {};
    // Gamepad
    private gamepadButtonStates: { [id: number]: boolean } = {};
    private gamepadAxis: { [axis: number]: Vector2 } = {};
    // Other
    private useGamepad: boolean = false;
    camera: PerspectiveCamera | OrthographicCamera = new PerspectiveCamera();

    private constructor() { }
   
    public static get Instance() {
        // do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }

    // Keyboard keystates
    public setKeyboardKeyState(keycode: string, value: boolean) {
        this.keyboardKeyStates[keycode] = value;
        if (value)
            this.useGamepad = false;
    } 
    public isKeyboardKeyDown(keycode: string) : boolean {
        return this.keyboardKeyStates[keycode];
    }

    // Mouse position
    public setMousePosition(newPosition: Vector2) {
        this.mousePos = newPosition;
    }
    public getMousePosition(): Vector2 {
        return this.mousePos;
    }

    // Projected mouse position
    public setProjectedMousePosition(newPosition: Vector3) {
        this.projectedMousePos = newPosition;
    }
    public getProjectedMousePosition(): Vector3 {
        return this.projectedMousePos;
    }

    // Mouse buttons
    public setMouseButtonKeyState(button: MouseButtons, value: boolean) {
        this.mouseButtonsStates[button] = value;
        if (value)
            this.useGamepad = false;
    }
    public isMouseButtonDown(button: MouseButtons) {
        return this.mouseButtonsStates[button];
    }

    // Gamepad buttons
    public setGamepadButtonState(button: GamepadButtons, value: boolean) {
        this.gamepadButtonStates[button] = value;
        if (value)
            this.useGamepad = true;
        else {
            if (!this.hasGamepadInput() && this.hasKeyboardAndMouseInput())
                this.useGamepad = false;
        }
    }
    public isGamepadButtonPressed(button: GamepadButtons): boolean {
        return this.gamepadButtonStates[button];
    }

    // Gamepad axis
    public setGamepadAxis(axis: GamepadAxis, value: Vector2) {
        this.gamepadAxis[axis] = value;
        if (value.length() != 0)
            this.useGamepad = true;
        else {
            if (!this.hasGamepadInput() && this.hasKeyboardAndMouseInput())
                this.useGamepad = false;
        }
    }
    public getGamepadAxis(axis: GamepadAxis): Vector2 {
        return this.gamepadAxis[axis];
    }

    // Use gamepad
    public getUseGamepad(): boolean {
        return this.useGamepad;
    }

    private hasGamepadInput(): boolean {
        let buttonInput = false;
        if (Object.values(this.gamepadButtonStates).length > 0)
            buttonInput = Object.values(this.gamepadButtonStates).includes(true);

        let stickInput = false;
        if (Object.values(this.gamepadAxis).length > 0) {
            Object.values(this.gamepadAxis).forEach(axis => {
                stickInput = stickInput || !!axis.length();
            });
        }
        return buttonInput || stickInput;
    }
    private hasKeyboardAndMouseInput(): boolean {
        let keyboardInput = false;
        if (Object.values(this.keyboardKeyStates).length > 0)
            keyboardInput = Object.values(this.keyboardKeyStates).includes(true);

        let mouseInput = false;
        if (Object.values(this.mouseButtonsStates).length > 0)
            mouseInput = Object.values(this.mouseButtonsStates).includes(true);

        return keyboardInput || mouseInput;
    }
}
