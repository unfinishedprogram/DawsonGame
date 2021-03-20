import { Action } from '../../utils/action';
import { Observer } from '../../utils/observer';
import { KeyboardInput, ButtonState} from '../inputSubject';

/** Represents the keyboard observer that processes all keyboard input */
export class KeyboardObserver extends Observer<KeyboardInput> {
    private inputMap: string[];
    
    /**
     * Initializes the keyboard observer
     * @param inputMap An array of the keys that are going to be listened to
     */
    constructor(inputMap: string[]) {
        super();
        this.inputMap = inputMap;
    }

    onNotify(action: Action, info: KeyboardInput) {
        if (action !== Action.KEYBOARD_INPUT) return;
        if (!this.inputMap.includes(info.key)) return;

        if (info.state === ButtonState.UP)
            globalThis.Input.setKeyboardKeyState(info.key, false);
        else if (info.state === ButtonState.DOWN && !globalThis.Input.isKeyboardKeyDown(info.key))
            globalThis.Input.setKeyboardKeyState(info.key, true);
    }

    // Input map
    public getInputMap(): string[] {
        return this.inputMap;
    }
    public setInputMap(inputMap: string[]) {
        this.inputMap = inputMap;
    }
    public addToInputMap(key: string) {
        this.inputMap.push(key);
    }
    public removeFromInputMap(key: string) {
        const index = this.inputMap.indexOf(key);
        if (index == -1)
            return;
        else
            this.inputMap.splice(index, 1);
    }
};
