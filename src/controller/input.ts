import { OrthographicCamera, PerspectiveCamera, Vector2, Vector3 } from "three";
import { MouseButtons } from "./mouse/mouseButtonObserver";

export class InputSingleton {
    private static _instance: InputSingleton;
    private keyboardKeyStates: { [id: string]: boolean } = {};
    private mousePos: Vector2 = new Vector2();
    private projectedMousePos: Vector3 = new Vector3();
    private mouseButtons: { [id: number]: boolean } = {};
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
        this.mouseButtons[button] = value;
    }
    public isMouseButtonDown(button: MouseButtons): boolean {
        return this.mouseButtons[button];
    }
}
