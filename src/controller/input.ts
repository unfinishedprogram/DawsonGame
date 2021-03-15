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
    camera: PerspectiveCamera | OrthographicCamera = new PerspectiveCamera();

    private constructor() { }
   
    public static get Instance() {
        // do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }

    // Keyboard keystates
    public setKeyboardKeyState(keycode: string, value: boolean) {
        this.keyboardKeyStates[keycode] = value;
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
    }
    public isMouseButtonDown(button: MouseButtons) {
        return this.mouseButtonsStates[button];
    }

    // Gamepad buttons
    public setGamepadButtonState(button: GamepadButtons, value: boolean) {
        this.gamepadButtonStates[button] = value;
    }
    public isGamepadButtonPressed(button: GamepadButtons): boolean {
        return this.gamepadButtonStates[button];
    }

    // Gamepad axis
    public setGamepadAxis(axis: GamepadAxis, value: Vector2) {
        this.gamepadAxis[axis] = value;
    }
    public getGamepadAxis(axis: GamepadAxis): Vector2 {
        return this.gamepadAxis[axis];
    }
}
