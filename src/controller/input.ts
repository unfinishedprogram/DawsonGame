export class InputSingleton {
    private static _instance: InputSingleton;
    keyStates: { [id: string]: boolean } = {};

    private constructor() { }
   
    public static get Instance() {
        // do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }

    public isKeyDown(keycode: string) : boolean {
        return this.keyStates[keycode];
    }
}
