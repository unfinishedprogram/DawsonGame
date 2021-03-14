import { Action } from "../../utils/action";
import { Observer } from "../../utils/observer";
import { GamepadAnalogInput } from "../inputSubject";

export enum Sticks {
    LEFT,
    RIGHT
}

export class GamepadAnalogObserver extends Observer<GamepadAnalogInput> {
    onNotify(action: Action, info: GamepadAnalogInput): void {
        if (action !== Action.GAMEPAD_MOVE) return;
        console.log(Sticks[info.stick] + ' stick moved to ' + info.value.x + ', ' + info.value.y);
    }
}
