import { Action } from "../../utils/action";
import { Observer } from "../../utils/observer";
import { GamepadAnalogInput } from "../inputSubject";

export enum GamepadAxis {
    LEFT,
    RIGHT
}

export enum GamepadAxisDirection {
    HORIZONTAL,
    VERTICAL
}

/** Represents the observer that processes all the analog (stick) gamepad input */
export class GamepadAnalogObserver extends Observer<GamepadAnalogInput> {
    onNotify(action: Action, info: GamepadAnalogInput): void {
        if (action !== Action.GAMEPAD_MOVE) return;
        globalThis.Input.setGamepadAxis(info.stick, info.value);
    }
}
