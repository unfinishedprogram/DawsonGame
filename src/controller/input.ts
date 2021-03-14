import { OrthographicCamera, PerspectiveCamera, Vector2, Vector3 } from "three";

export class InputSingleton {
    private static _instance: InputSingleton;
    private keyboardKeyStates: { [id: string]: boolean } = {};
    mosuePos: Vector2 = new Vector2();
    projectedMousePos: Vector3 = new Vector3();
    mouseButtons: { [id: number]: boolean } = {};
    camera: PerspectiveCamera | OrthographicCamera = new PerspectiveCamera();

    private constructor() { }
   
    public static get Instance() {
        // do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }

    public setKeyboardKeyState(keycode: string, value: boolean) {
        this.keyboardKeyStates[keycode] = value;
    } 
    public isKeyboardKeyDown(keycode: string) : boolean {
        return this.keyboardKeyStates[keycode];
    }


}
