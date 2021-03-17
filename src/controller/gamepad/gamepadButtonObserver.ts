import { Action } from "../../utils/action";
import { Observer } from "../../utils/observer";
import { ButtonState, GamepadButtonInput } from "../inputSubject";

export enum GamepadButtons {
    A,
    B,
    X,
    Y,
    LB,
    RB,
    LT,
    RT,
    BACK,
    START,
    LSTICK,
    RSTICK,
    UP,
    DOWN,
    LEFT,
    RIGHT,
    GUIDE 
}

/** Represents the observer that processes all gamepad button input */
export class GamepadButtonObserver extends Observer<GamepadButtonInput> {
    onNotify(action: Action, info: GamepadButtonInput): void {
        if (action !== Action.GAMEPAD_INPUT) return;
        if ( info.state === ButtonState.DOWN )
            globalThis.Input.setGamepadButtonState(info.button, true);
        else
            globalThis.Input.setGamepadButtonState(info.button, false);
    }
}
