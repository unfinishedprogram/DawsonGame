export class InputSingleton {
    private static _instance: InputSingleton;
    keyStates: { [id: string]: boolean } = {};
    // ^ this should be private. We shouldn't allow any part of the code to change the key state.

    private constructor() { }
   
    public static get Instance() {
        // do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }

    // This is useless if keyStates is not private.
    public isKeyDown(keycode: string) : boolean {
        return this.keyStates[keycode];
    }

}
